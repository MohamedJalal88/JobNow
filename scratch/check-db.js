const url = 'https://sfzfrutggvzdtelvrftw.supabase.co/rest/v1/profiles?select=*';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmemZydXRnZ3Z6ZHRlbHZyZnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjYzNjcsImV4cCI6MjA5NDg0MjM2N30.TGijxjDEExkEgnevb5RDw17BrWE2oicyy2gki636iR4';

fetch(url, {
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key
  }
})
.then(res => res.json())
.then(data => {
  console.log('Profiles in DB:', data.length);
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => console.error(err));
