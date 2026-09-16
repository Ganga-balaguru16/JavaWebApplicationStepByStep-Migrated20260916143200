```java
package com.in28minutes.filter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 * Unit tests for {@link LoginRequiredFilter}.
 */
@ExtendWith(MockitoExtension.class)
class LoginRequiredFilterTest {

    @InjectMocks
    private LoginRequiredFilter filter;

    @Mock
    private HttpServletRequest httpRequest;

    @Mock
    private ServletResponse servletResponse;

    @Mock
    private FilterChain filterChain;

    @Mock
    private RequestDispatcher requestDispatcher;

    @Mock
    private HttpSession httpSession;

    @Mock
    private FilterConfig filterConfig;

    @Test
    @DisplayName("Given a user name attribute in session, when doFilter, then chain proceeds")
    void givenUserNameInSession_whenDoFilter_thenChainProceeds() throws IOException, ServletException {
        // Arrange
        when(httpRequest.getSession()).thenReturn(httpSession);
        when(httpSession.getAttribute("name")).thenReturn("john");
        // Act
        filter.doFilter(httpRequest, servletResponse,