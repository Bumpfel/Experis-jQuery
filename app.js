let lastLoadedItem = '', itemLimit = 10

const render = () => {
  return $.ajax({
    url: `https://www.reddit.com/r/meme/top.json?after=${lastLoadedItem}&limit=${itemLimit}`,
    success: function (response) {
      lastLoadedItem = response.data.after
      
      $('#title').text('Subreddit: ' + response.data.children[0].data.subreddit)
      response.data.children.forEach(item => {       
        const subredditItem = `
        <div class="list-group-item rounded mb-4">
          <small class="m-2">Posted by ${item.data.author}</small>
          <a target="_blank" class="row m-2 mb-3" href='${'https://www.reddit.com' + item.data.permalink}'>${item.data.title}</a>
          <div class="container col-8">
            <img src="${item.data.url}" class="img-fluid">
          </div>

          <div class="row">        
            <div class="col"><strong>Score: </strong> ${item.data.score}</div>
          </div>

          <div class="row">
            <div class="col"><strong>Comments: </strong> ${item.data.num_comments}</div>

          </div>

          <div class="mt-4 card-group">
            <i class="fa fa-thumbs-o-up mr-3"> ${item.data.ups}</i>
            <i class="fa fa-thumbs-o-down mr-3"> ${item.data.downs}</i>
          </div>
        </div>
        `
        $("#posts").append(subredditItem);
      });

      const defaultLinkSize = '150%'
      const defaultWidth = '600'
      $('#posts .list-group-item').css({
        width: defaultWidth
      })
      $('#posts a').css({
        fontSize: defaultLinkSize
      })

      // Event listener on hover post
      $('#posts .list-group-item').hover(function (e) {
        // mouse enter
        $(this).css({ border: '2px solid blue' })

        $(this).find('a').animate({
          fontSize: '180%'
        }, { queue: false })

        // animate item size
        $(this).animate({
          width: defaultWidth * 1.1 + 'px'
        }, { queue: false })
      }, function (e) {
        // mouse leave
        $(this).css({ border: '' })

        // restore link font size
        $(this).find('a').animate({
          fontSize: defaultLinkSize
        }, { queue: false })

        // restore item size
        $(this).animate({
          width: defaultWidth + 'px'
        }, { queue: false })
      });
    },
    error: function () {
      console.log("There were an error.");
    }
  })
}

$(document).ready(function () {
  render()
})

const loadMoreContent = () => {
  const fullyScrolled = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

  if (fullyScrolled) {
    console.log('scroll triggered')
    
    window.removeEventListener('scroll', loadMoreContent)
    
    $('#posts').append(loader)
    render().then(() => {
      $('#posts #loader').remove()
      window.addEventListener('scroll', loadMoreContent)
    })
  }
}

const loader = `<div id="loader">Loading...<div>`

window.addEventListener('scroll', loadMoreContent)
