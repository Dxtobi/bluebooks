<script>
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    /**
	 * @param {{ clientX: number; target: { getBoundingClientRect: () => { (): any; new (): any; left: number; top: number; }; }; clientY: number; }} event
	 */
    function handleMouseDown(event) {
      isDragging = true;
      offsetX = event.clientX - event.target.getBoundingClientRect().left;
      offsetY = event.clientY - event.target.getBoundingClientRect().top;
    }
  
    /**
	 * @param {{ clientX: number; clientY: number; }} event
	 */
    function handleMouseMove(event) {
      if (isDragging) {
        const div = document.querySelector('.draggable');
        div.style.left = event.clientX - offsetX + 'px';
        div.style.top = event.clientY - offsetY + 'px';
      }
    }
  
    function handleMouseUp() {
      isDragging = false;
    }
  
    /**
	 * @param {{ touches: any[]; target: { getBoundingClientRect: () => { (): any; new (): any; left: number; top: number; }; }; }} event
	 */
    function handleTouchStart(event) {
      const touch = event.touches[0];
      offsetX = touch.clientX - event.target.getBoundingClientRect().left;
      offsetY = touch.clientY - event.target.getBoundingClientRect().top;
    }
  
    /**
	 * @param {{ touches: any[]; }} event
	 */
    function handleTouchMove(event) {
      const touch = event.touches[0];
      const div = document.querySelector('.draggable');
      div.style.left = touch.clientX - offsetX + 'px';
      div.style.top = touch.clientY - offsetY + 'px';
    }
  </script>
  
  <style>
    .draggable {
        position: fixed;
    cursor: pointer;
    color: white;
    background: #000000;
    border-radius: 50px;
    width: fit-content;
    backdrop-filter: blur(14px);
      top: 60px;
      width: 100%;
      right: -30%
    }
  </style>
  
  <div
    class="draggable px-5 p-2 bg-gray-700"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseUp}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
  >
    <slot></slot>
  </div>
  