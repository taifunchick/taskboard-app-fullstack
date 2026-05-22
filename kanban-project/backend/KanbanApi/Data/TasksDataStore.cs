using KanbanApi.Models;

namespace KanbanApi.Data;

public class TasksDataStore
{
    public List<TaskItem> Tasks { get; set; } = new()
    {
        new TaskItem { Id = 1, Title = "Learn Angular", Description = "Read the documentation", Status = "done" },
        new TaskItem { Id = 2, Title = "Setup Docker", Description = "Build images", Status = "inprogress" },
        new TaskItem { Id = 3, Title = "Make a commit", Description = "Push code to repo", Status = "todo" }
    };
}
