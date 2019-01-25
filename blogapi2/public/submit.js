document.getElementById('textarea').addEventListener('keypress', e => {
  if(e.which == 13 && !e.shiftKey) {
    //$(this).closest("form").submit();
    document.getElementById('mainform').submit();
    //console.log(document.getElementById('mainform'));
    e.preventDefault();
    return false;
  }
});
