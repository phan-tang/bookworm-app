<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;

class UserRepository extends BaseRepository
{

    /**
     * Login function.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login($request)
    {
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            $email = $request->input('email');
            $password = $request->input('password');

            $status = 500;
            $message = 'Email or password is incorrect!';

            $user = User::where('email', $email)->firstOr(function () {
                return null;
            });
            if ($user != null) {
                if (Hash::check($password, $user->password, [])) {
                    // if ($password == $user->password) {
                    $user->remember_token = $user->createToken('authToken')->plainTextToken;
                    $status = 200;
                    $message = 'Logged in successfully';
                }
            }
            return response()->json([
                'status_code' => $status,
                'message' => $message,
                'remember_token' => $user->remember_token,
                'full_name' => $user->first_name . ' ' . $user->last_name
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Logout function.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status_code' => 200,
                'message' => 'Logged out'
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
