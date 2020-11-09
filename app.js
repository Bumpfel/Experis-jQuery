$(document).ready(function () {

  $.ajax({
    url: 'https://www.reddit.com/r/meme/top.json?limit=10',
    success: function (response) {
      $('#title').text('Subreddit: ' + response.data.children[0].data.subreddit)
      response.data.children.forEach(element => {
        $("#posts").append(`<a style="display: block" href='${'https://www.reddit.com' + element.data.permalink}'>${element.data.title}</a>`);
      });

      $("#posts a").hover(function (e) {
        $(this).filter(':not(:animated)').animate({
          fontSize: '25px'
        });
      },function (e) {
          $(this).animate({
            fontSize: '15px'
          });
      });
    },
    error: function () {
      console.log("There were an error.");
    }
  })
})