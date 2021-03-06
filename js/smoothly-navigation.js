!function(){
  var view = View('nav.menu')
  var controller = {
    view: null,
    aTages: null,
    init: function(view){
      this.view = view
      this.initAnimation()
      this.bindEvents()
    },
    initAnimation: function(){
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    scrollToElement: function(element){
      let top = element.offsetTop

      let currentTop = window.scrollY //当前TOP
      let targetTop = top - 80 //目标TOP
      let s = targetTop - currentTop
      let t = Math.abs((s / 100) * 500)
      if (t > 1000) {
        t = 1000
      }
      var coords = {
        y: currentTop
      }; //tween.js缓动效果
      var tween = new TWEEN.Tween(coords)
        .to({
          y: targetTop
        }, t)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(function () {
          window.scrollTo(0, coords.y)
        })
        .start();
    },
    bindEvents: function(){
      let aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
      for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = (x)=> {
          x.preventDefault()
          let a = x.currentTarget
          let href = a.getAttribute('href') //'#siteAbout'
          let element = document.querySelector(href)
          this.scrollToElement(element)
        }
      }
    },
  }

  controller.init(view)
}.call()

