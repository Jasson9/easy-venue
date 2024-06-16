<script>
import { redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { SignOut } from '@auth/sveltekit/components';

export function load(){
    if (!$page.data.session) {
        throw redirect(307, '/');
    }
}
</script>

<main>
    {#if $page.data.session}
        <h1>Profile Page</h1>
        <p>Logged in as {$page.data.session.user?.email}</p>
        <p>Name: {$page.data.session.user?.name}</p>
        <SignOut class="rounded-border-btn">Log Out</SignOut>
    {/if}
</main>
