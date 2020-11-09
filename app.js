let limit = 10

const setLimit = (nr) => {
  limit = nr
}

$(document).ready(function () {
  $.ajax({
    url: 'https://www.reddit.com/r/meme/top.json?limit=' + limit,
    success: function (response) {
      $('#title').text('Subreddit: ' + response.data.children[0].data.subreddit)
      response.data.children.forEach(element => {
        const subredditItem = `
        <div class="list-group-item rounded mb-4">
          <small class="m-2">Posted by ${element.data.author}</small>
          <a target="_blank" class="row m-2 mb-3" href='${'https://www.reddit.com' + element.data.permalink}'>${element.data.title}</a>
          <div class="container col-8">
            <img src="${element.data.url}" class="img-fluid">
          </div>

          <div class="row">        
            <div class="col"><strong>Score: </strong> ${element.data.score}</div>
          </div>

          <div class="row">
            <div class="col"><strong>Comments: </strong> ${element.data.num_comments}</div>

          </div>

          <div class="mt-4 card-group">
            <i class="fa fa-thumbs-o-up mr-3"> ${element.data.ups}</i>
            <i class="fa fa-thumbs-o-down mr-3"> ${element.data.downs}</i>
          </div>
        </div>
        `
        $("#posts").append(subredditItem);
      });

      const defaultLinkSize = '150%'
      const defaultWidth = '80%'
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
          width: '90%'
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
          width: defaultWidth
        }, { queue: false })
      });
    },
    error: function () {
      console.log("There were an error.");
    }
  })
})
