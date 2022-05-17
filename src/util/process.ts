// 掉落颗粒的量
export function processCanvas(): HTMLCanvasElement {
	let particle_no = 25;

	const requestAnimFrame = (function () {
		return (
			window.requestAnimationFrame ||
			// window.webkitRequestAnimationFrame ||
			// window.mozRequestAnimationFrame ||
			// window.oRequestAnimationFrame ||
			// window.msRequestAnimationFrame ||
			function (callback: Function) {
				window.setTimeout(callback, 1000 / 60);
			}
		);
	})();

	const canvas = document.createElement("canvas");
	// var canvas = document.getElementsByTagName("canvas")[0];
	var ctx = canvas.getContext("2d", {
		alpha: true,
	}) as CanvasRenderingContext2D;

	var counter = 0;
	let particles: Array<particle> = [];
	var w = 400,
		h = 100; // 动画的宽高
	canvas.width = w;
	canvas.height = h;

	function reset() {
		ctx.clearRect(0, 0, w, h);

		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = "#171814";
		ctx.fillRect(25, 80, 350, 25);
	}

	// 进度条类，每次绘画要保证颜色变化，渐变，宽度变化
	class progressbar {
		widths = 0;
		hue = 0;

		draw() {
			ctx.fillStyle = "hsla(" + this.hue + ", 100%, 40%, 1)";
			ctx.fillRect(25, 80, this.widths, 25);
			var grad = ctx.createLinearGradient(0, 0, 0, 130);
			grad.addColorStop(0, "transparent");
			grad.addColorStop(1, "rgba(0,0,0,0.5)");
			ctx.fillStyle = grad;
			ctx.fillRect(25, 80, this.widths, 25);
		}
	}

	// 粒子类 决定粒子的位置，大小，和颜色
	class particle {
		x = 23 + bar.widths;
		y = 82;

		vx = 0.8 + Math.random() * 1;
		v = Math.random() * 5;
		g = 1 + Math.random() * 3;
		down = false;

		draw() {
			var size = Math.random() * 3;

			ctx.fillStyle = "hsla(" + (bar.hue + 0.3) + ", 100%, 40%, 1)";
			// ctx.fillRect(this.x, this.y, size, size);
			ctx.fillRect(this.x, this.y, 4, 4);
		}
	}

	const bar = new progressbar();

	// 总控制，绘画的速度，颜色变化速度，从头开始
	function draw() {
		reset();
		counter++;

		bar.hue += 0.8; // 颜色变化步幅

		bar.widths += 1.1; // 长度变化步幅
		if (bar.widths > 350) {
			if (counter > 215) {
				reset();
				bar.hue = 0;
				bar.widths = 0;
				counter = 0;
				particles = [];
			} else {
				bar.hue = 126;
				bar.widths = 351;
				bar.draw();
			}
		} else {
			bar.draw();
			for (var i = 0; i < particle_no; i += 10) {
				particles.push(new particle());
			}
		}
		update();
	}

	function update() {
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			p.x -= p.vx;
			if (p.down == true) {
				p.g += 0.1;
				p.y += p.g;
			} else {
				if (p.g < 0) {
					p.down = true;
					p.g += 0.1;
					p.y += p.g;
				} else {
					p.y -= p.g;
					p.g -= 0.1;
				}
			}
			p.draw();
		}
	}

	function animloop() {
		draw();
		requestAnimFrame(animloop);
	}

	animloop();
	return canvas;
}
