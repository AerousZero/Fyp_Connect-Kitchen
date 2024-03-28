import React, { useState, useEffect } from "react";
import { getUser } from "../api/auth";
import Cookies from "js-cookie";

const useUser = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return; // Early return if no access token

      setIsLoading(true);
      try {
        const response = await getUser(accessToken);
        setProfile(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  return { profile, isLoading, error, accessToken };
};

export default useUser;
