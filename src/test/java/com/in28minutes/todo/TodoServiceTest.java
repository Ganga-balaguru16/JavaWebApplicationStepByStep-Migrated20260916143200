package com.in28minutes.todo;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TodoServiceTest {

    private TodoService todoService;

    @BeforeEach
    void setUp() throws Exception {
        // reset the static list to its initial state before each test
        Field todosField = TodoService.class.getDeclaredField("todos");
        todosField.setAccessible(true);
        List<Todo> freshList = new ArrayList<>();
        freshList.add(new Todo("Learn Web Application Development", "Study"));
        freshList.add(new Todo("Learn Spring MVC", "Study"));
        freshList.add(new Todo("Learn Spring Rest Services", "Study"));
        todosField.set(null, freshList); // static field, instance is null

        todoService = new TodoService();
    }

    @Test
    @DisplayName("Retrieve todos when service is initialized then returns pre‑populated list")
    void givenInitialState_whenRetrieveTodos_thenReturnPrepopulatedList() {
        // Arrange
        // (setup performed in @BeforeEach)

        // Act
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertNotNull(result, "Resulting list should not be null");
        assertEquals(3, result.size(), "Initial list should contain three todos");
        assertTrue(result.stream().anyMatch(t -> "Learn Web Application Development".equals(t.getTitle())),
                "List should contain 'Learn Web Application Development'");
        assertTrue(result.stream().anyMatch(t -> "Learn Spring MVC".equals(t.getTitle())),
                "List should contain 'Learn Spring MVC'");
        assertTrue(result.stream().anyMatch(t -> "Learn Spring Rest Services".equals(t.getTitle())),
                "List should contain 'Learn Spring Rest Services'");
    }

    @Test
    @DisplayName("Add a valid todo then list contains the new todo")
    void givenNewTodo_whenAddTodo_thenListContainsTodo() {
        // Arrange
        Todo newTodo = new Todo("Write Tests", "Practice");

        // Act
        todoService.addTodo(newTodo);
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(4, result.size(), "List size should increase by one");
        assertTrue(result.contains(newTodo), "List should contain the newly added todo");
    }

    @Test
    @DisplayName("Add duplicate todo instances then list contains both instances")
    void givenDuplicateTodo_whenAddTodo_thenListContainsBothInstances() {
        // Arrange
        Todo duplicateTodo = new Todo("Duplicate", "Same");

        // Act
        todoService.addTodo(duplicateTodo);
        todoService.addTodo(duplicateTodo); // add same instance again
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(5, result.size(), "List size should reflect both added duplicates");
        long count = result.stream().filter(t -> t == duplicateTodo).count();
        assertEquals(2, count, "Both duplicate instances should be present");
    }

    @Test
    @DisplayName("Add null todo then list contains a null element")
    void givenNullTodo_whenAddTodo_thenListContainsNull() {
        // Arrange
        // Act
        todoService.addTodo(null);
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(4, result.size(), "List size should increase even when null is added");
        assertTrue(result.contains(null), "List should contain a null element");
    }

    @Test
    @DisplayName("Delete an existing todo then it is removed from the list")
    void givenExistingTodo_whenDeleteTodo_thenListDoesNotContainTodo() {
        // Arrange
        Todo existing = new Todo("Learn Spring MVC", "Study");
        // Act
        todoService.deleteTodo(existing);
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(2, result.size(), "List size should decrease by one");
        assertFalse(result.contains(existing), "Deleted todo should no longer be present");
    }

    @Test
    @DisplayName("Delete a non‑existing todo then list size remains unchanged")
    void givenNonExistingTodo_whenDeleteTodo_thenListSizeUnchanged() {
        // Arrange
        Todo nonExisting = new Todo("Non Existing", "None");

        // Act
        todoService.deleteTodo(nonExisting);
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(3, result.size(), "List size should stay the same when deleting non‑existing todo");
    }

    @Test
    @DisplayName("Delete null todo then list remains unchanged")
    void givenNullTodo_whenDeleteTodo_thenListUnchanged() {
        // Arrange
        // Act
        todoService.deleteTodo(null);
        List<Todo> result = todoService.retrieveTodos();

        // Assert
        assertEquals(3, result.size(), "List size should remain unchanged when deleting null");
        assertFalse(result.contains(null), "List should not contain null after delete operation");
    }

    @Test
    @DisplayName("Modify retrieved list then service internal list reflects the change")
    void givenRetrievedList_whenModified_thenServiceListReflectsChanges() {
        // Arrange
        List<Todo> retrieved = todoService.retrieveTodos();

        // Act
        retrieved.clear();

        // Assert
        List<Todo> afterClear = todoService.retrieveTodos();
        assertTrue(afterClear.isEmpty(), "Clearing the retrieved list should affect the service's internal list");
    }
}