<script lang="ts">
    export let data;
  import { Carousel } from "flowbite-svelte";
  import VenueCard from "$components/venueCard.svelte";
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
</script>

<main>
    <div class="carousel-overlay">
        <Carousel
        style=" height: 80vh; object-fit:cover; "
        class="rounded-none shadow-lg" {
            images
        } duration={3000}/>
    </div>
    <div class="container md mx-auto py-4">
        <h1 class="text-3xl font-bold text-center">Popular Venues</h1>
        <div class="flex flex-wrap gap-16 place-content-center">

        {#each data.venues as venue}
            <VenueCard
                venueName={venue.name}
                venueLocation={venue.state}
                price={"Rp "+String(venue.price)}
                capacity={String(venue.capacity)+" people"}
                venueRating={String(venue.rating)}
                imageSrc={venue.image}
                data={data}
                wishlistId={data.wishlist.find(wish => wish.venueId == venue.venueId)?.wishlistId}
                venueId={venue.venueId}
            ></VenueCard>
        {/each}
        </div>
    </div>
    
<!-- 
    <div class="container md mx-auto py-4">
        <VenueCard
        imageSrc="/img/venues/Venue11.png"
    ></VenueCard>
    </div> -->

    

</main>

<style>
    .carousel-overlay{
        filter:brightness(0.85);
        pointer-events:none;
        /* height: 480px !important; */
        z-index: -1;
    }
  main {
    flex: 1;
  }
</style>
