<script lang="ts">
    import {addVenue, deleteAllVenues, deleteVenue} from '../../lib/venues';
    import {dummmyVenues} from '../../dummies/venue';
    deleteAllVenues()
    for (let venue of dummmyVenues){
        addVenue(venue)
    }
</script>