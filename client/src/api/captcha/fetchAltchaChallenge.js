const fetchAltchaChallenge = async () => {
  try {
    const response = await fetch("/api/altcha-challenge");
    if (response.ok) {
      const challenge = await response.json();
      return challenge;
    }
  } catch (error) {
    return error;
  }
};
