<script >
    export let currentNav = "Home";
</script>


<nav class="mobile-navbar-container">
    <a href="./" class={currentNav==="Home"?"activeNav":""}>
        <img src="https://img.icons8.com/ios/50/000000/home--v1.png" alt="home"/>
        <p>Home</p>
    </a>
    <a href="./chat" class={currentNav==="Chat"?"activeNav":""}>
        <img src="https://img.icons8.com/ios/50/000000/chat--v1.png" alt="chat"/>
        <p>Chat</p>
    </a>
    <a href="./notification" class={currentNav==="Notification"?"activeNav":""}>
        <img src="https://img.icons8.com/ios/50/000000/appointment-reminders--v1.png" alt="notification"/>
        <p>Notification</p>
    </a>
    <a href="./reservation" class={currentNav==="Reservation"?"activeNav":""}>
        <img src="https://img.icons8.com/ios/50/bill.png" alt="bill"/>
        <!-- <img src="https://img.icons8.com/ios/50/000000/user.png" alt="user"/> -->
        <p>Reservation</p>
    </a>
</nav>


<style>
    .mobile-navbar-container{
        position: sticky;
        bottom: 0px;
        background-color: white;
        display: none;
        justify-content: space-evenly;
    }

    @media (max-width: 768px){
        .mobile-navbar-container{
            display: flex;
        }
    }

    .mobile-navbar-container a img{
        width: 30px;
    }
    
    .mobile-navbar-container a{
        width: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0px 5px 0px;
    }

    .mobile-navbar-container .activeNav{
        background-color: yellow;
    }

</style>