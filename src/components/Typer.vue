<template>
	<span class="type-it"></span>
</template>

<script>

import TypeIt from 'typeit'

export default {
	name: "Typer",
	props: {
		values: {
			type: Array,
			required: true,
		},
	},
	data() {
      return {
        values: this.values,
      }
	},
	mounted () {
      new TypeIt(this.$el, {
        strings: this.values,
        speed: 10,
        lifeLike: false,
				cursorChar: "▮",
        cursor: {
					autoPause: true,
					autoPauseDelay: 500,
					animation: {
						frames: [0, 0, 1].map((n) => {
							return { opacity: n };
						}),
						options: {
							iterations: Infinity,
							easing: "steps(2, start)",
							fill: "forwards",
						},
					},
				},
        nextStringDelay: 5,
        startDelete: false,
        loop:true,
        loopDelay:10000,
			}).go();
	}
};
</script>
