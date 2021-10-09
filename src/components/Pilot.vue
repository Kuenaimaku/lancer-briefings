<template>
	<div class="pilot-wrapper" @click="pilotModal">
		<div class="pilot">
			<img :src="pilotPortrait" class="pilot-portrait" />
			<div class="pilot-loadout">
				<div class="name">
					<h1>Callsign</h1>
					<h2>{{ pilot.callsign }}</h2>
				</div>
				<div class="name">
					<h1>Name or Legal Alias</h1>
					<h2>{{ pilot.alias }}</h2>
				</div>
				<div class="code">{{ pilot.code }}</div>
			</div>
			<div class="mech-loadout">
				<div class="name">
					<h1>{{ pilot.corpro }} // {{ pilot.frame }}</h1>
					<h2>{{ pilot.mech }}</h2>
				</div>
			</div>
			<img :src="mechPortrait" class="mech-portrait" />
		</div>
		<div class="middle">
			<div class="text">&nbsp;</div>
		</div>
	</div>
</template>

<script>

import PilotModal from './PilotModal.vue';

export default {
	components: {
		PilotModal
	},
	props: {
		pilot: {
			type: Object,
			required: true,
		}
	},
	computed: {
		pilotPortrait() {
			return `/pilots/${this.pilot.callsign}.png`
		},
		mechPortrait() {
			return `/mechs/${this.pilot.mech}.png`
		},
	},
	methods: {
		pilotModal() {
			this.$oruga.modal.open({
				parent: this,
				component: PilotModal,
				custom: true,
				trapFocus: true,
				props: {
					pilot: this.pilot,
				},
				class: "TEST",
				width: 1920,
			});
		},
	}
}
</script>