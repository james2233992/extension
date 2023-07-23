function addFBContacts(userIds) {

    // Iterar los usuarios y ejecutar las acciones
    userIds.forEach(id => {
      fbAPI.sendFriendRequest(id);
      fbAPI.addToGroup(id); 
    });
  
  }
  
  // Llamado desde el background
  addFBContacts(potentialContacts);