package com.in28minutes.login;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class LoginServiceTest {

    @InjectMocks
    private LoginService loginService;

    @Test
    @DisplayName("Given valid credentials when isUserValid then return true")
    void givenValidCredentials_whenIsUserValid_thenReturnTrue() {
        // Arrange
        String user = "in28Minutes";
        String password = "dummy";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertTrue(result, "Expected valid credentials to return true");
    }

    @Test
    @DisplayName("Given invalid username when isUserValid then return false")
    void givenInvalidUsername_whenIsUserValid_thenReturnFalse() {
        // Arrange
        String user = "wrongUser";
        String password = "dummy";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertFalse(result, "Expected invalid username to return false");
    }

    @Test
    @DisplayName("Given invalid password when isUserValid then return false")
    void givenInvalidPassword_whenIsUserValid_thenReturnFalse() {
        // Arrange
        String user = "in28Minutes";
        String password = "wrongPass";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertFalse(result, "Expected invalid password to return false");
    }

    @Test
    @DisplayName("Given null username when isUserValid then throw NullPointerException")
    void givenNullUsername_whenIsUserValid_thenThrowNullPointerException() {
        // Arrange
        String user = null;
        String password = "dummy";

        // Act & Assert
        assertThrows(NullPointerException.class, () -> loginService.isUserValid(user, password));
    }

    @Test
    @DisplayName("Given null password when isUserValid then throw NullPointerException")
    void givenNullPassword_whenIsUserValid_thenThrowNullPointerException() {
        // Arrange
        String user = "in28Minutes";
        String password = null;

        // Act & Assert
        assertThrows(NullPointerException.class, () -> loginService.isUserValid(user, password));
    }

    @Test
    @DisplayName("Given empty strings when isUserValid then return false")
    void givenEmptyUsernameAndPassword_whenIsUserValid_thenReturnFalse() {
        // Arrange
        String user = "";
        String password = "";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertFalse(result, "Expected empty credentials to return false");
    }

    @Test
    @DisplayName("Given whitespace username when isUserValid then return false")
    void givenWhitespaceUsername_whenIsUserValid_thenReturnFalse() {
        // Arrange
        String user = "   ";
        String password = "dummy";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertFalse(result, "Expected whitespace username to return false");
    }

    @Test
    @DisplayName("Given case‑sensitive mismatch when isUserValid then return false")
    void givenCaseSensitiveMismatch_whenIsUserValid_thenReturnFalse() {
        // Arrange
        String user = "IN28MINUTES"; // different case
        String password = "dummy";

        // Act
        boolean result = loginService.isUserValid(user, password);

        // Assert
        assertFalse(result, "Expected case‑sensitive username mismatch to return false");
    }
}