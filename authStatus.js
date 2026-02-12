app.get("/api/auth/status", (req, res) => {
  if (req.session && req.session.user) {
    res.json({
      loggedIn: true,
      user: {
        id: req.session.user.id,
        name: req.session.user.name,
        email: req.session.user.email
      }
    });
  } else {
    res.json({ loggedIn: false });
  }
});
