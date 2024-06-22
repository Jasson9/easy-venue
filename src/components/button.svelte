<script>
// @ts-nocheck

	
	let buttonProps = {
	    class:[$$restProps.class, "button"].join(" "),
	}
</script>
	<button on:click
			on:mouseover
			on:mouseenter
			on:mouseleave
		{...buttonProps}>
			<slot/>
	</button>

<style>
    .button{
        padding:0.3em 2em;
        border-radius:0.5em;
        border:none;
        cursor:pointer;
        font-weight: 600;
    }

    .button-blue, .blue{
        background-color:var(--Secondary-Blue);
        color:white;
    }

	.primary, .orange{
		background-color:var(--Secondary-Orange);
        color: white;
	}

    .secondary, .white{
        background-color:white;
        color:var(--Secondary-Orange);
    }

	.danger {
		color:red;
	}
	.sm {
		font-size:1em;
		padding:0.1em;
	}
	.lg {
		font-size:2em
	}

    .pb{
        padding-bottom:0.6em;
        padding-top: 0.6em
    }
</style>