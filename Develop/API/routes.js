// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // API routes
app.get('/api/notes', (req, res) => {
    // Read the `db.json` file and return saved notes as JSON
    const notes = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8');
    res.json(JSON.parse(notes));
  });
  
  app.post('/api/notes', (req, res) => {
    // Receive a new note from the request body
    const newNote = req.body;
  
    // Read existing notes from `db.json`
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
  
    // Generate a unique ID for the new note (you can use npm packages like `uuid`)
    newNote.id = uuid.v4();
  
    // Add the new note to the existing notes
    notes.push(newNote);
  
    // Write the updated notes array back to `db.json`
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), 'utf8');
  
    // Return the new note to the client
    res.json(newNote);
  });
  