<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReviewAPITest extends TestCase
{
    /**
     * Test get reviews by book id successfully.
     *
     * @return void
     */
    public function testGetReviewsByBookIdSuccessfully()
    {
        $id = 179;
        $response = $this->get('/api/reviews/?id=' . $id);
        $reviews = json_decode($response->getContent())->reviews->data;
        $isTrue = true;
        foreach ($reviews as $index  => $value) {
            if ($value->book_id != $id) {
                $isTrue = false;
                break;
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test count reviews by book id successfully.
     *
     * @return void
     */
    public function testCountReviewsByBookIdSuccessfully()
    {
        $id = 179;
        $count = 9;
        $response = $this->get('/api/reviews/?id=' . $id);
        $count_reviews = json_decode($response->getContent())->count_reviews;
        $this->assertEquals($count, $count_reviews[0]);
    }

    /**
     * Test calculate average rating star of reviews by book id successfully.
     *
     * @return void
     */
    public function testCalculateAverageRatingStarOfReviewsByBookIdSuccessfully()
    {
        $id = 179;
        $average_rating_star = 0;
        $response = $this->get('/api/reviews/?id=' . $id);
        $count_reviews = json_decode($response->getContent())->count_reviews;
        foreach ($count_reviews as $index => $value) {
            if ($index != 0) {
                $average_rating_star += $index * $value;
            }
        }
        $this->assertEquals(round($average_rating_star / $count_reviews[0], 2), 2.78);
    }
}
