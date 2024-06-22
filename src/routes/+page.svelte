<script lang="ts">
    export let data;
  import { Carousel } from "flowbite-svelte";
  import VenueCard from "$components/venueCard.svelte";
    import Button from "$components/button.svelte"
  const images = [
    {
      alt: 'Venue 11',
      src: '/img/venues/Venue11.png',
      title: 'Venue 11'
    },
    {
      alt: 'Venue 12',
      src: '/img/venues/Venue12.png',
      title: 'Venue 12'
    },
    {
      alt: 'Venue 17',
      src: '/img/venues/Venue17.png',
      title: 'Venue 17'
    },    
    {
      alt: 'Venue 14',
      src: '/img/venues/Venue14.png',
      title: 'Venue 14'
    },
    ]
    // console.log(data)
</script>

<main>
    <div class="carousel-overlay">
      <div class="carousel-obj">
        <Carousel
        style=" height: 80vh; object-fit:cover; "
        class="rounded-none shadow-lg" {
            images
        } duration={3000} imgClass="home-carousel"/>
        </div>
        <div class="home-carousel-title flex flex-col gap-2">
          <h1>Easy <h1 class="orange">Venue</h1></h1>
          <h2 class="text-white text-3xl">Ease your way for finding venues</h2>
          <div class="flex flex-row gap-8 mt-4 justify-end">
            <a href="/login">
              <Button class="white pb">Join Now</Button>
            </a>
            <a href="#popular-venues">
              <Button class="orange pb">See Venues</Button>
            </a>
          </div>
        </div>
    </div>
    <div class="container flex flex-col items-center gap-4 md mx-auto py-4">
        <h1 class="text-3xl font-bold text-center" id="popular-venues">Popular Venues</h1>
        <div class="flex flex-wrap gap-16 place-content-center">

        {#each data.venues as venue}
            <VenueCard
                venueName={venue.name}
                venueLocation={venue.state}
                price={"Rp "+String(venue.price)}
                capacity={String(venue.capacity)+" people"}
                venueRating={String(venue.rating)}
                imageSrc={venue.image||""}
                data={data}
                wishlistId={data.wishlist.find(wish => wish.venueId == venue.venueId)?.wishlistId}
                venueId={venue.venueId}
            ></VenueCard>
        {/each}
        </div>
        <a href="/recommendation" class="w-100 px-4">
          <img class="" alt="AI Recommendation" src="/AI-Recommendation.png">
          <h3 class="ai-recommendation-text">AI Recommendation</h3>
        </a>
    </div>


    
<!-- 
    <div class="container md mx-auto py-4">
        <VenueCard
        imageSrc="/img/venues/Venue11.png"
    ></VenueCard>
    </div> -->

    

</main>

<style>

  .ai-recommendation-text{
    position: absolute;
    transform: translate(20px,-30px);
    color:white;
  }
  .home-carousel-title{
    position: absolute;
    top: 200px;
    width: 100%;
    text-align: right;
    padding-right: 40px;
  }

  .home-carousel-title h1{
    display: inline;
    font-size: 4rem;
    color: white;
    /* text-shadow: 2px 2px 4px #000000; */
    font-weight: bold;
  }

  .home-carousel-title h1 .orange{
    color: var(--Secondary-Orange)
  }
    .carousel-overlay{
        /* height: 480px !important; */
        z-index: -1;
    }
    .carousel-obj{
      filter:brightness(0.85);
      pointer-events:none;
      /* height: 480px !important; */
      z-index: -2;
      filter:brightness(0.75);
    }
  main {
    flex: 1;
  }
</style>
