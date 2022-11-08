<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BooksAPITest extends TestCase
{
    /**
     * Test sort books by on sale successfully.
     *
     * @return void
     */
    public function testSortBooksByOnSaleSuccessfully()
    {
        $response = $this->get('/api/books?sort=on_sale&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($index > 0) {
                if ($books[$index]->discount_amount > $books[$index - 1]->discount_amount) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->discount_amount == $books[$index - 1]->discount_amount) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test sort books by popular successfully.
     *
     * @return void
     */
    public function testSortBooksByPopularSuccessfully()
    {
        $response = $this->get('/api/books?sort=popular&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($index > 0) {
                if ($books[$index]->number_of_reviews > $books[$index - 1]->number_of_reviews) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->number_of_reviews == $books[$index - 1]->number_of_reviews) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test sort books by recommended successfully.
     *
     * @return void
     */
    public function testSortBooksByRecommendedSuccessfully()
    {
        $response = $this->get('/api/books?sort=recommended&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($index > 0) {
                if ($books[$index]->average_rating_star > $books[$index - 1]->average_rating_star) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->average_rating_star == $books[$index - 1]->average_rating_star) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test sort books by price low to high.
     *
     * @return void
     */
    public function testSortBooksByPriceLowToHighSuccessfully()
    {
        $response = $this->get('/api/books?sort=price&order=asc&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($index > 0) {
                if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                    $isTrue = false;
                    break;
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test sort books by price high to low.
     *
     * @return void
     */
    public function testSortBooksByPriceHighToLowSuccessfully()
    {
        $response = $this->get('/api/books?sort=price&order=desc&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($index > 0) {
                if ($books[$index]->final_price > $books[$index - 1]->final_price) {
                    $isTrue = false;
                    break;
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test filter books by author id successfully.
     *
     * @return void
     */
    public function testFilterBooksByAuthorIdSuccessfully()
    {
        $id = 1;
        $response = $this->get('/api/books?author_id=' . $id . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->author->id != $id) {
                $isTrue = false;
                break;
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test filter books by category id successfully.
     *
     * @return void
     */
    public function testFilterBooksByCategoryIdSuccessfully()
    {
        $id = 2;
        $response = $this->get('/api/books?category_id=' . $id . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->category->id != $id) {
                $isTrue = false;
                break;
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test filter books by category id successfully.
     *
     * @return void
     */
    public function testFilterBooksByStarSuccessfully()
    {
        $star = 3;
        $response = $this->get('/api/books?star=' . $star . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->average_rating_star < $star) {
                $isTrue = false;
                break;
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test apply sort by on sale and filter by category id for books successfully.
     *
     * @return void
     */
    public function testApplySortByOnSaleAndFilterByCategoryIdForBooksSuccessfully()
    {
        $id = 1;
        $response = $this->get('/api/books?sort=on_sale&category_id=' . $id . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->category->id != $id) {
                $isTrue = false;
                break;
            }
            if ($index > 0) {
                if ($books[$index]->discount_amount > $books[$index - 1]->discount_amount) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->discount_amount == $books[$index - 1]->discount_amount) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test apply sort by popular and filter by author id, star for books successfully.
     *
     * @return void
     */
    public function testApplySortByPopularAndFilterByAuthorIdStarForBooksSuccessfully()
    {
        $author_id = 1;
        $star = 2;
        $response = $this->get('/api/books?sort=popular&author_id=' . $author_id . '&star=' . $star . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->author->id != $author_id) {
                $isTrue = false;
                break;
            }
            if ($value->average_rating_star < $star) {
                $isTrue = false;
                break;
            }
            if ($index > 0) {
                if ($books[$index]->number_of_reviews > $books[$index - 1]->number_of_reviews) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->number_of_reviews == $books[$index - 1]->number_of_reviews) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test apply sort by recommended and filter by author id, category id, star for books successfully.
     *
     * @return void
     */
    public function testApplySortByRecommendedAndFilterByAuthorIdCategoryIdStarForBooksSuccessfully()
    {
        $author_id = 6;
        $category_id = 1;
        $star = 1;
        $response = $this->get('/api/books?sort=recommended&author_id=' . $author_id . '&category_id=' . $category_id . '&star=' . $star . '&limit=all');
        $books = json_decode($response->getContent())->resource;
        $isTrue = true;
        foreach ($books as $index  => $value) {
            if ($value->author->id != $author_id) {
                $isTrue = false;
                break;
            }
            if ($value->category->id != $category_id) {
                $isTrue = false;
                break;
            }
            if ($value->average_rating_star < $star) {
                $isTrue = false;
                break;
            }
            if ($index > 0) {
                if ($books[$index]->average_rating_star > $books[$index - 1]->average_rating_star) {
                    $isTrue = false;
                    break;
                }
                if ($books[$index]->average_rating_star == $books[$index - 1]->average_rating_star) {
                    if ($books[$index]->final_price < $books[$index - 1]->final_price) {
                        $isTrue = false;
                        break;
                    }
                }
            }
        }
        $this->assertTrue($isTrue);
    }

    /**
     * Test get book by id successfully.
     *
     * @return void
     */
    public function testGetBookByIdSuccessfully()
    {
        $id = 3;
        $response = $this->get('/api/book/' . $id);
        $book = json_decode($response->getContent())->data;
        $this->assertEquals($id, $book->id);
    }
}
