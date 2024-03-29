import { useState } from "react";
import { Box, Heading, Input, Button, Text, Checkbox, CheckboxGroup, Stack, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaSearch } from "react-icons/fa";

const SYMPTOMS = ["Fever", "Cough", "Headache", "Fatigue", "Nausea", "Diarrhea", "Skin rash", "Muscle pain", "Sore throat", "Shortness of breath"];

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [treatment, setTreatment] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-5zky.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-5zky.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup successful",
          description: "You can now log in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSymptomSelection = (selectedItems) => {
    setSelectedSymptoms(selectedItems);
  };

  const handleTreatmentSearch = () => {
    // TODO: Implement the logic to fetch treatment based on selected symptoms
    // For now, just display a dummy treatment
    setTreatment("Take Paracetamol 500mg twice a day for 3 days");
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Medical Treatment
      </Heading>

      {!isLoggedIn ? (
        <Box>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} />
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin} mr={4}>
            Login
          </Button>
          <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignup}>
            Signup
          </Button>
        </Box>
      ) : (
        <Box>
          <Text mb={4}>Select symptoms:</Text>
          <CheckboxGroup colorScheme="green" value={selectedSymptoms} onChange={handleSymptomSelection}>
            <Stack spacing={2}>
              {SYMPTOMS.map((symptom) => (
                <Checkbox key={symptom} value={symptom}>
                  {symptom}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <Button leftIcon={<FaSearch />} colorScheme="blue" mt={4} onClick={handleTreatmentSearch}>
            Get Treatment
          </Button>
          {treatment && (
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={4}>
                Treatment
              </Heading>
              <Text>{treatment}</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Index;
