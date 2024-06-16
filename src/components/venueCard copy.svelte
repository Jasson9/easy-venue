<script>
    /**
   * @type {any}
   */
     export let venueName = "Venue Name";
     export let rating = 0.0;
     export let venueAddress = "Venue Address";
     export let imgUrl = "";
     rating = Math.max(0, Math.min(5, rating));
     /**
   * @param {number} input
   */
     function changeRating(input){
            rating = input;
     }
</script>

<div class="venue-card click click-style">
    <img class="venue-image" 
    alt={venueName}
    src={imgUrl}
    >
    <h2 class="venue-name">{venueName}</h2>
    <p class="venue-address">{venueAddress}</p>
    <div class="rating-container">
        <div class="rating-icons-container">
            {#each new Array(Math.floor(rating)) as _, i}
            <img src="https://img.icons8.com/color/ios-glyphs/30/000000/filled-star.png" alt="filled-star"/>
            {/each}
            {#if rating % 1 >= 0.5}
            <img src="https://img.icons8.com/color/ios-glyphs/30/000000/star-half-empty.png" alt="star-half-empty"/>
            {/if}
            {#each new Array(5 - Math.ceil(rating)) as _, i}
            <img src="https://img.icons8.com/color/ios-glyphs/30/000000/star--v1.png" alt="star--v1"/>
            {/each}
        </div>
        <p>{rating}</p>
    </div>
</div>


<style>

    *{
        margin: 0px;
        padding: 0px;
    }

    .venue-card .rating-container{
        display: flex;
        align-items: center;
        gap: 5px;
        /* width: 30px; */
    }

    .venue-card .rating-container .rating-icons-container{
        display: flex;
    }

    .venue-card .rating-icons-container img{
        width: 20px;
        
    }


    .venue-card .venue-image{
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .venue-card{
        box-shadow: 3px 4px 12px 0px #0000007d;
        border-radius: 10px;
        padding: 10px;
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
    }
</style>