! function () {
  var view = View('section.message')

  var model = Model({resourceName:'Message'})

  var controller = Controller({

    init: function(view, model){
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      this.loadMessages()
    },
    loadMessages: function(){
      this.model.fetch().then(
          (messages)=> {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.name}: ${item.content}`
              this.messageList.appendChild(li)
            })
          },
          (error)=> {
            alert('提交失败，请改天来留言')
            // 异常处理
          })
      },
      bindEvents: function(){
        console.log(this.form)
        this.form.addEventListener('submit', function (e) {
          e.preventDefault()
          this.saveMessage()
        }.bind(this))
      },
      saveMessage: function(){
        let myForm = this.form
        let content = myForm.querySelector('input[name=content]').value
        let name = myForm.querySelector('input[name=name]').value
        this.model.save({'name':name, 'content':content}).then(function (object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}: ${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = ''
        })
      }
  })

  
  controller.init(view, model)

}.call()