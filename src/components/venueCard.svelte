<script lang="ts">
    import { addVenueToWishlist, removeVenueFromWishlist } from "$lib/wishlist"
    export let venueLocation = "Bali";
    export let price = "from Rp500.000/hour";
    export let capacity = "50 people";
    export let venueRating = "5.0";
    export let showCapacity = true;
    export let venueName = "Rock Cafe Bali";
    export let showPrice = true;
    export let imageSrc = ""
    export let venueId = "";
    let className = "";
    import Icon from "@iconify/svelte";
    import type { Wishlist } from "@prisma/client"
    export let wishlistId:string|undefined = undefined;
    export let data: any;

    async function wishlistVenue() {
        if(data?.session){
            console.log(data.wishlist)
            if(!wishlistId){
                wishlistId = await fetch("/api/wishlist/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+data.session.sessionToken,
                    },
                    body: JSON.stringify({
                        venueId: venueId,
                    }),
                }).then(res => res.json()).then((data:Wishlist)=>data.wishlistId);
              }else{
                await fetch("/api/wishlist/remove", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+data.session.sessionToken,
                    },
                    body: JSON.stringify({
                        wishlistId: wishlistId
                    }),
                });
                wishlistId = undefined;
            }
        }
    }


</script>
  
  <div class="{'venue-card'}">
    <div class="frame-14">
      <div class="group-16">
        <img class="image-16" src={imageSrc} alt={venueName}/>
        <div class="frame-17">
          <div class="ellipse-1"></div>
          <div class='wishlist-icon'>
            <button class="wishlist-icon" on:click={()=>wishlistVenue()}>
                <Icon  color={wishlistId?"red":"#A3A3A3"} height=24px icon="mdi:heart" />
            </button>
        </div>
        </div>
      </div>
      <div class="frame-15">
        <div class="rock-cafe-bali">{venueName}</div>
        <Icon color="#F8B84E" icon="material-symbols:star" />
        <div class="_5-0">{venueRating}</div>
      </div>
      <div class="frame-172">
        <Icon icon="mdi:location" />
        <div class="bali">{venueLocation}</div>
      </div>
      <div class="layer-2">
        {#if showCapacity}
        <div class="frame-18">
          <Icon icon="material-symbols:group" />
          <div class="_50-people">{capacity}</div>
        </div>
        {/if}
      </div>
      {#if showPrice}
      <div class="from-rp-500-000-hour">{price}</div>
      {/if}
    </div>
  </div>
  
  <style>
    .wishlist-icon{
        transition: 0.5s;
    }

    .venue-card,
    .venue-card * {
      box-sizing: border-box;
    }
    .venue-card {
      border-radius: 10px;
      height: 368px;
      position: relative;
    }
    .frame-14 {
      background: rgba(188, 207, 255, 0.41);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: flex-start;
      height: 368px;
      left: 0px;
      top: 0px;
      overflow: hidden;
    }
    .group-16 {
      flex-shrink: 0;
      width: 360px;
      height: 219px;
      position: static;
    }
    .image-16 {
      border-radius: 5px 5px 0px 0px;
      width: 360px;
      height: 219px;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    .image-15 {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0%;
      left: 0%;
      bottom: 0%;
      top: 0%;
      object-fit: cover;
    }
    .frame-17 {
      border-radius: 5px 5px 0px 0px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 313px;
      top: 179px;
    }
    .ellipse-1 {
      background: #d9d9d9;
      border-radius: 50%;
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      position: relative;
    }
    .wishlist-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      position: absolute;
      left: calc(50% - 12px);
      top: calc(50% - 11px);
      overflow: visible;
    }
    .frame-15 {
      display: flex;
      flex-direction: row;
      gap: 7px;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
      width: 332px;
      position: relative;
    }
    .rock-cafe-bali {
      color: #000000;
      text-align: left;
      font-family: "OpenSans-Bold", sans-serif;
      font-size: 25px;
      font-weight: 700;
      position: relative;
      width: 270px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .vector {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      position: relative;
      overflow: visible;
    }
    ._5-0 {
      color: #000000;
      text-align: left;
      font-family: "OpenSans-Regular", sans-serif;
      font-size: 16px;
      font-weight: 400;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .frame-172 {
      display: flex;
      flex-direction: row;
      gap: 5px;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
      width: 332px;
      height: 22px;
      left: 14px;
      top: 266px;
    }
    .eva-pin-outline {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      position: relative;
      overflow: visible;
    }
    .bali {
      color: #000000;
      text-align: left;
      font-family: "OpenSans-Regular", sans-serif;
      font-size: 16px;
      font-weight: 400;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .layer-2 {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
      width: 330px;
    }
    .frame-18 {
      display: flex;
      flex-direction: row;
      gap: 7px;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
      width: 154px;
      position: relative;
    }
    .people {
      flex-shrink: 0;
      overflow: visible;
    }
    ._50-people {
      color: #000000;
      text-align: left;
      font-family: "OpenSans-Regular", sans-serif;
      font-size: 16px;
      font-weight: 400;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .from-rp-500-000-hour {
      color: #000000;
      text-align: right;
      font-family: "OpenSans-Bold", sans-serif;
      font-size: 16px;
      font-weight: 700;
      position: absolute;
      left: 158px;
      top: 330px;
      width: 185px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  
    /* variant styles */
    .venue-card.property-1-variant-2 {
      overflow: hidden;
    }
    .venue-card.property-1-variant-2 .frame-14 {
      overflow: unset;
    }
    .venue-card.property-1-variant-2 .image-16,
    .venue-card.property-1-variant-2 .frame-17 {
      border-radius: unset;
    }
    .venue-card.property-1-variant-2 .heart {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      position: absolute;
      left: 5px;
      top: 6px;
      object-fit: cover;
    }
    .venue-card.property-1-variant-2 .from-rp-500-000-hour {
      left: 150px;
      width: 193px;
    }
  </style>
  