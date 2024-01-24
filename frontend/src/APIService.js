const baseInit = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

const host = "http://localhost:5001/";

const apiFetch = async (path, init) => {
  const url = new URL(path, host).href;
  console.log(`Fetching URL: ${url} with options:`, init);
  return await fetch(url, { ...baseInit, ...init });
};

export default class APIService {
  static useDummyData = false;
  static async register(body) {
    console.log(body);
    try {
      const response = await apiFetch("/api/v1/users", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async login(body) {
    console.log(body);

    try {
      const response = await apiFetch("/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      let result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return console.log(error);
    }
  }

  static async createProfile(body) {
    console.log(body);

    try {
      const response = await apiFetch("/api/v1/userProfiles", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async updateProfile(body, id) {
    console.log(body);

    try {
      const response = await apiFetch(`/api/v1/userProfiles`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async checkLoginStatus() {
    return await apiFetch("/api/v1/users/check");
  }

  static async logout() {
    return await apiFetch("/api/v1/users/logout", {
      method: "POST",
    });
  }

  static async fetchProfile() {
    return await apiFetch(`/api/v1/userProfiles`);
  }

  static async fetchDestinations() {
    return await apiFetch(`/api/v1/travelDestinations`);
  }

  static async createGroup(body) {
    console.log(body);
    try {
      const response = await apiFetch("/api/v1/groups", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchGroup() {
    return await apiFetch(`/api/v1/groups`);
  }

  static async search(query) {
    console.log(`Searching for query: ${query}`);
    try {
      const response = await apiFetch(
        `/api/v1/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log("Search response data:", data);
      return data;
    } catch (error) {
      console.log("Error in search function:", error);
    }
  }

  static async fetchGroupDetails(groupId) {
    const response = await apiFetch(`/api/v1/groups/detail/${groupId}`);
    let result = await response.json();
    console.log("result");
    console.log(result);
    return result;
  }

  static async fetchGroupUserInfo(groupId) {
    const response = await apiFetch(`/api/v1/groups/user/${groupId}`);
    let result = await response.json();
    console.log("result");
    console.log(result);
    return result;
  }

  static async fetchTravelInfo(travelId) {
    return await apiFetch(`/api/v1/travelDestinations/${travelId}/coordinates`);
  }

  static async fetchFriends() {
    return await apiFetch(`/api/v1/friends`);
  }

  static async fetchSuggestedFriends() {
    return await apiFetch(`/api/v1/friends/suggested`);
  }

  static async createFriend(id) {
    console.log("The sent id is gonna be " + id);

    try {
      const response = await apiFetch("/api/v1/friends/suggestedOne", {
        method: "POST",
        body: JSON.stringify(id),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async addToGroup(id) {
    console.log("The sent id is gonna be " + id);

    try {
      const response = await apiFetch("/api/v1/groups/user", {
        method: "POST",
        body: JSON.stringify(id),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchAllDestinations() {
    console.log("Fetching all destinations...");
    if (APIService.useDummyData) {
      console.log("Using dummy data for destinations.");
      return [
        {
          id: 1,
          name: "Destination 1",
          description: "Sample Destination",
          address: "Sample Address 1",
        },
      ];
    } else {
      try {
        const response = await apiFetch("/api/v1/search/destinations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Destinations fetched successfully.");
        return await response.json();
      } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
      }
    }
  }

  static async fetchUserEvents() {
    return await apiFetch(`/api/v1/events/fetch`);
  }

  static async createReport(body) {
    console.log(body);
    try {
      const response = await apiFetch("/api/v1/reports", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchGroupById(userId) {
    return await apiFetch(`/api/v1/groups/${userId}`);
  }

  static async fetchEvents() {
    return await apiFetch(`/api/v1/events`);
  }

  static async addUserEvents(body) {
    console.log(body);

    try {
      const response = await apiFetch("/api/v1/events/create", {
        method: "POST",
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchAllGroups() {
    console.log("Fetching all groups...");
    if (APIService.useDummyData) {
      console.log("Using dummy data for groups.");
      return [
        {
          id: 1,
          group_name: "Group 1",
          travel_destination_name: "Destination for Group 1",
          created_user_id: 1, // Assuming this field is needed as per your schema
        },
      ];
    } else {
      try {
        const response = await apiFetch("/api/v1/search/groups");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Groups fetched successfully.");
        let result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        console.error("Error fetching groups:", error);
        return [];
      }
    }
  }

  static async fetchUsersByDestination(destinationId) {
    console.log(
      `Fetching users interested in destination with ID: ${destinationId}`
    );
    if (APIService.useDummyData) {
      // Dummy data for development
      console.log("Using dummy data for users interested in destination.");
      return [
        { id: 1, name: "User One", profilePicture: "/images/user1.jpg" },
        { id: 2, name: "User Two", profilePicture: "/images/user2.jpg" },
      ];
    } else {
      try {
        const response = await apiFetch(
          `/api/v1/travelDestinations/${destinationId}/users`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Users interested in destination fetched successfully.");
        let result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        console.error("Error fetching users by destination:", error);
        return [];
      }
    }
  }

  static async getUserProfileById(id) {
    try {
      const response = await apiFetch(`/api/v1/userProfiles/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Could not fetch user profile: ", error);
      // Depending on your error handling you could also throw the error here
      return null;
    }
  }

  static async getTravelDestinationsByUserId(userId) {
    try {
      const response = await apiFetch(
        `/api/v1/travelDestinations/user/${userId}`
      );
      if (response.ok) {
        const destinations = await response.json();
        return destinations;
      } else {
        // Handle non-2xx HTTP responses
        const errorText = await response.text();
        console.error("Non-OK HTTP Response:", errorText);
        throw new Error("Non-OK HTTP Response");
      }
    } catch (error) {
      console.error("Error fetching travel destinations:", error);
      throw error;
    }
  }

  static async fetchAllUsers() {
    console.log("Fetching all users...");
    if (APIService.useDummyData) {
      console.log("Using dummy data for users.");
      return [
        {
          id: 1,
          email: "user1@example.com",
          password: "password", // It's generally bad practice to handle passwords in front-end code like this
        },
      ];
    } else {
      try {
        const response = await apiFetch("/api/v1/search/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Users fetched successfully.");
        return await response.json();
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    }
  }

  static async removeFriend(userId, friendId) {
    try {
      const response = await apiFetch(
        `/api/v1/friends/delete/${userId}/${friendId}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async removeGroup(groupId) {
    try {
      const response = await apiFetch(`/api/v1/groups/delete/${groupId}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchUserMessageHistory(userId) {
    try {
      const response = await apiFetch(`/api/v1/chatMessages/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const messages = await response.json();
      return messages.messages;
    } catch (error) {
      console.error("Error fetching user message history:", error);
      throw error;
    }
  }

  static async fetchGroupMessageHistory(groupId) {
    try {
      const response = await apiFetch(`/api/v1/chatMessages/group/${groupId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const messages = await response.json();
      return messages.messages;
    } catch (error) {
      console.error("Error fetching group message history:", error);
      throw error;
    }
  }

  static async fetchChatRecents() {
    try {
      const response = await apiFetch(`/api/v1/chatMessages/recent`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching chat recents:", error);
      throw error;
    }
  }

  static async sendMessage(body, toType, toId) {
    console.log(body);
    try {
      const response = await apiFetch(`/api/v1/chatMessages/create`, {
        method: "POST",
        body: JSON.stringify({ message: body, toId, toType }),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }
}
