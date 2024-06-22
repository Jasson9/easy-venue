<script lang="ts">
    import Button from "$components/button.svelte"
    import { signIn } from "@auth/sveltekit/client"
    // import { page } from "$app/stores"
    export let data;
    let email = ""
    let error = ""
    let password = ""

    async function logIn(){
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        if(res.ok){
            res.json().then((data)=>{
                document.cookie = `authjs.session-token=${data.sessionToken}; path=/; max-age=86400; samesite=strict; secure`;
                window.location.href = "/";
            })
        }else{
            let body:any = {};
            try{
                body = await res.json()
                error = "Failed to login: " + body.error;
            }catch(e){
                error = "Failed to login: " + res.statusText;
            }
        }
    }
  </script>
   
<main class="flex justify-center py-8 mt-12">
    
    <div class="container-sm center flex flex-col gap-6">
        <h1 class="w-full text-center text-4xl">Login</h1>
        <form class="flex flex-col w-80 items-center gap-5" method="dialog">
            <input placeholder="Email" class="credential-input" name="email" type="email" bind:value={email} />
            <input placeholder="Password" class="credential-input" name="password" type="password" bind:value={password} />
            <Button class="button-blue" on:click={async () => await logIn()}>
                Log in
            </Button>
            <p>have no account yet? <a href="/register" class="text-blue-600">Register</a></p>
        </form>
        <p class="text-red-600 text-center">{error}</p>
        <div class="or-separator flex flex-row items-center gap-2">
            <hr class="w-1/2 border-black" />
            <p>or</p>
            <hr class="w-1/2 border-x-0 border-black" />
        </div>
        <div>
            <button class="flex items-center bg-slate-300 py-2 flex-row w-full justify-evenly rounded-md" on:click={() => signIn('google', { callbackUrl:"/"})}>
                <img src="https://img.icons8.com/color/36/000000/google-logo.png" alt="google logo" />
                <p class="text-left">Log in with Google</p>
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
