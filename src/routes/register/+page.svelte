<script lang="ts">
    import Button from "$components/button.svelte"
    import { signIn } from "@auth/sveltekit/client"
    // import { page } from "$app/stores"
   
    let email = ""
    let password = ""
    let confirmPassword = ""
    let username = ""
    let error = ""
    let phoneNum = ""

    async function register(email:string,password:string,confirmPassword:string,username:string,phoneNum:string){
        if(/\S+@\S+\.\S+/.test(email) === false){
            error = "Invalid email format"
            return
        }
        if(username.length < 3){
            error = "Username must be at least 3 characters"
            return
        }
        if(password.length < 8){
            error = "Password must be at least 8 characters"
            return
        }
        if(password !== confirmPassword){
            error = "Password and Re-enter password does not match"
            return
        }


        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password, confirmPassword, username, phoneNum})
        })
        if(res.ok){
            window.location.href = "/login";
        }else{
            let body:any = {};
            try{
                body = await res.json()
                error = "Failed to register: " + body.error;
            }catch(e){
                error = "Failed to register: " + res.statusText;
            }
        }
    }
</script>
   
<main class="flex justify-center py-8 mt-12">
    <div class="container-sm center flex flex-col gap-6">
        <h1 class="w-full text-center text-4xl">Register</h1>
        <form class="flex flex-col w-80 items-center gap-5">
            <input placeholder="Email" class="credential-input" name="email" type="email" bind:value={email} />
            <input placeholder="Phone Number" class="credential-input" name="phoneNum" type="tel" bind:value={phoneNum} />
            <input placeholder="Username" class="credential-input" name="username" type="text" bind:value={username} />
            <input placeholder="Password" class="credential-input" name="password" type="password" bind:value={password} />
            <input placeholder="Re-enter Password" class="credential-input" name="confirmPassword" type="password" bind:value={confirmPassword} />
            <Button class="button-blue" on:click={() => register(email,password,confirmPassword,username,phoneNum)}>
                Sign Up
            </Button>
            <p>Already have an account? <a href="/login" class="text-blue-600">Login</a></p>
            {#if error}
                <p class="text-red-600 text-center">{error}</p>
            {/if}
        </form>
        <div class="or-separator flex flex-row items-center gap-2">
            <hr class="w-1/2 border-black" />
            <p>or</p>
            <hr class="w-1/2 border-x-0 border-black" />
        </div>
        <div>
            <button class="flex items-center bg-slate-300 py-2 flex-row w-full justify-evenly rounded-md" on:click={() => signIn('google', { callbackUrl:"/"})}>
                <img src="https://img.icons8.com/color/36/000000/google-logo.png" alt="google logo" />
                <p class="text-left">Sign up with Google</p>
            </button>
        </div>
    </div>
</main>

<style>
    .credential-input{
        height: 36px;
        border-radius: 5px;
        width: 100%;
        color: var(--Secondary-Blue);
        border-color: var(--Secondary-Blue);
    }
    .credential-input::placeholder{
        color: var(--Secondary-Blue);
    }

</style>
