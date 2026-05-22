using Microsoft.AspNetCore.Mvc;
using KanbanApi.Models;
using KanbanApi.Data;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace KanbanApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TasksDataStore _dataStore;
    private readonly ILogger<TasksController> _logger;

    public TasksController(TasksDataStore dataStore, ILogger<TasksController> logger)
    {
        _dataStore = dataStore;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<TaskItem>> GetAll() => _dataStore.Tasks.ToList();

    [HttpGet("{id}")]
    public ActionResult<TaskItem> GetById(int id)
    {
        var task = _dataStore.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();
        return task;
    }

    [HttpPost]
    public ActionResult<TaskItem> Create([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Title))
            return BadRequest(new { message = "Title is required" });

        task.Id = _dataStore.Tasks.Count > 0 ? _dataStore.Tasks.Max(t => t.Id) + 1 : 1;
        if (string.IsNullOrEmpty(task.Status)) task.Status = "todo";
        
        _dataStore.Tasks.Add(task);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] TaskItem updatedTask)
    {
        var task = _dataStore.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        task.Title = updatedTask.Title ?? task.Title;
        task.Description = updatedTask.Description ?? task.Description;
        if (!string.IsNullOrEmpty(updatedTask.Status)) task.Status = updatedTask.Status;

        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public ActionResult<TaskItem> UpdateStatus(int id, [FromBody] JsonElement body)
    {
        var task = _dataStore.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) 
        {
            _logger.LogWarning("Task {Id} not found", id);
            return NotFound();
        }

        string? newStatus = null;
        try 
        {
            if (body.TryGetProperty("status", out JsonElement statusProp))
            {
                newStatus = statusProp.GetString();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error parsing status for task {Id}", id);
            return BadRequest(new { message = "Invalid format" });
        }

        if (string.IsNullOrEmpty(newStatus))
            return BadRequest(new { message = "Status is required" });

        var validStatuses = new[] { "todo", "inprogress", "done" };
        if (!validStatuses.Contains(newStatus.ToLower()))
            return BadRequest(new { message = "Invalid status" });

        task.Status = newStatus.ToLower();
        _logger.LogInformation("Task {Id} updated to {Status}", id, task.Status);
        
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var task = _dataStore.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        _dataStore.Tasks.Remove(task);
        return NoContent();
    }
}
