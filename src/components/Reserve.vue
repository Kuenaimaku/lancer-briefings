<template>
	<div class="reserve">
		<div class="name">
			<h1>{{ reserve.type }}</h1>
			<h2>{{ reserve.name }}</h2>
		</div>
		<div class="description">
			{{ reserve.description }}
		</div>
		<div v-if="reserve.callsign" class="pilot">
			<img :src="ownerImage" class="portrait" />
			<div class="name">
				<h1>Reserve Owner</h1>
				<h2>{{ reserve.callsign }}</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Reserve",
	components: {},
	props: {
		reserve: {
			type: Object,
			required: true,
		},
		pilots: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {};
	},
	computed: {
		ownerImage() {
			var pilot = this.pilots.find(obj => {
				return obj.callsign.toUpperCase() == this.reserve.callsign.toUpperCase();
			});

			if (pilot) {
				return pilot.cloud_portrait;
			}
		},
	},
	methods: {},
};
</script>
