//public/scripts/paginate.js

let page = 0

function paginate(){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`/paginate`,{page:page},function(data, status){
        appendItem(data.items, data)
    })
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(const item of items){
            html += `<div class="post">`
            html += `<a class="thumb" href="/post/${item.key}">`
            html += `<img src="${item.thumb}" />`
                    if(item.videos){
                        if(item.videos !== ""){
                            if(item.videos !== "[]"){
                                html += `<img class="play-icon" src="/images/play.png" />`
                            }
                        }
                    }
                html += `</a>`
                html += `<div class="wrapper">`
                html += `<a class="title" href="/post/${item.key}">`
                html += item.title
                html += `</a>`
                html += `<div class="content">${item.content}</div>`
                html += `</div>`
            html += `</div>`
        }
    }
    
    let message = ''
    if(data.count - data.page*data.fpostLimit === 1){
        message = `1 more post`
    }else if(data.count - data.page*data.fpostLimit <= 0){
        message = `no more post`
    }else{
        message = `${data.count - data.page*data.fpostLimit} more posts`
    }

    $('.post-list').append(html)
    $('.pagination p').html(message)
    
    $('.pagination img').attr('src', '/images/loadmore.png')
}