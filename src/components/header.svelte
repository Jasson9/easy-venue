<script>
    import { page } from "$app/stores"
    import SignInButton from "$lib/SignInButton.svelte"
    import { SignIn } from "@auth/sveltekit/components"
    import logo from '../img/logo.webp';
    import Icon from '@iconify/svelte';
</script>
<header>
    <div class="left-header header-part">
        <div class="hamburger-btn click">
            <img src="https://img.icons8.com/ios/50/000000/menu--v1.png" alt="menu"/>
        </div>
        <a href="./" class="flex place-items-center left-header-default">
            <img src={logo} class="header-logo">
            <h1 class="header-title text-2xl">Easy Venue</h1>
        </a>
    </div>
    
    <div class="right-header header-part justify-end">
        <a class="navigation" href="/">Home</a>
        <a class="navigation" href="/wishlist">Wishlist</a>
        <a class="navigation" href="/contact-us">Contact Us</a>
        <div class="search-container">
            <input type="text" placeholder="Search" class="search-input"/>
            <div class="search-btn click click-style">
                <Icon icon="material-symbols:search" width=24px color={'black'}/>
                <!-- <img src="https://img.icons8.com/ios/50/000000/search--v1.png" alt="search"/>     -->
                </div>
        </div>
        {#if $page.data.session}
        <div class="notification-btn click">
            <Icon width=30px icon="mingcute:notification-line" />
            <!-- <img src="https://img.icons8.com/ios/50/000000/appointment-reminders--v1.png"/> -->
        </div>

        <div class="profile-pic-container click click-style">
            <a href="/profile">            <img
                alt="User avatar"
                src={$page.data?.session?.user?.image ??
                  "https://source.boringavatars.com/marble/120"}
                class="avatar"
              /></a>
        </div>
      {:else}
        <SignIn class="rounded-border-btn"></SignIn>
      {/if}

    </div>

</header>


<style lang="postcss">
    @import '../styles/global.css';

    .right-header *{
        color: white;
        font-weight: 400;
        white-space: nowrap;
    }

    .profile-pic-container img{
        width: 30px;
        border-radius: 50%;
    }

    .right-header img{
        width: 32px;
    }

    .header-logo{
        width: 48px;
        height: 48px;
    }

    .profile-pic-container{
        display: flex;
        border: 2px solid black;
        border-radius: 50%;
        background-color: white;
    }

    .header-part{
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .right-header{
        display: flex;
        gap: 30px;
    }

    .header-title {
        color: white;
    }

    .notification-btn{
        display: flex;
        align-items: center;
    }

    .search-container .search-btn img{
        width: 26px;
    }

    .search-container .search-btn{
        display: flex;
        /* border-left: 1px solid black; */
        height: inherit;
        align-items: center;
        padding: 0px 12px;
        /* background-color: rgb(221, 221, 221); */
        border-radius: 0px 5px 5px  0px;
    }

    .search-container{
        /* min-width: 160px; */
        /* width: 30vw; */
        width: 40%;
        max-width: 400px;
        display: flex;
        gap: 5px;
        background-color: white;
        border-radius: 5px;
        padding-left: 12px;
        height: 32px;
        justify-content: space-between;
        align-items: center;
    }

    .search-container input, .search-container input::placeholder{
        background-color: transparent;
        border: none;
        width: 20vw;
        color: var(--Secondary-Orange);
    }

    .search-container input:focus-visible{
        outline: none;
    }
    
    header{
        /* width: 100vw; */
        background-color: var(--Secondary-Orange);
        padding: 5px;
        text-align: center;
        top: 0px;
        left: 0px;
        position: sticky;
        /* margin-bottom: 10px; */
        display: flex;
        flex-wrap: nowrap;
        gap : 20px;
        align-items: center;
        justify-content: space-between;
        padding: 0px 12px;
        height: 56px;
        z-index: 1000;
    }

    .hamburger-btn img{
        width: 30px;
        display: none;
    }

    .middle-header{
        flex-grow: 0.8;
        justify-content: center;
    }

    @media (max-width: 768px){
        .left-header-default{
            display: none;
        }
        .hamburger-btn img{
            display: block;
        }

        .right-header{
            gap: 10px;
        }

        .search-container .search-btn{
            padding: 0px 5px;
        }

        .left-header{
            gap: 0px;
        }

        .notification-btn{
            display: none;
        }
    }

    @media (max-width: 425px){

    }   
</style>