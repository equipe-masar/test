using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SimpleShop.API.Data;

namespace SimpleShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly SimpleShopDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<HealthController> _logger;

    public HealthController(
        SimpleShopDbContext context,
        IConfiguration configuration,
        ILogger<HealthController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow,
            service = "SimpleShop.API (.NET)",
            version = "1.0.0"
        });
    }

    [HttpGet("db")]
    public async Task<IActionResult> CheckDatabase()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            
            var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";
            await command.ExecuteScalarAsync();
            
            _logger.LogInformation("Database connection successful");
            
            return Ok(new
            {
                status = "healthy",
                database = "connected",
                timestamp = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database connection failed");
            return StatusCode(503, new
            {
                status = "unhealthy",
                database = "disconnected",
                error = ex.Message,
                timestamp = DateTime.UtcNow
            });
        }
    }

    [HttpGet("dbcontext")]
    public async Task<IActionResult> CheckDbContext()
    {
        try
        {
            var canConnect = await _context.Database.CanConnectAsync();
            
            if (canConnect)
            {
                _logger.LogInformation("DbContext connection successful");
                return Ok(new
                {
                    status = "healthy",
                    dbContext = "connected",
                    timestamp = DateTime.UtcNow
                });
            }
            else
            {
                _logger.LogWarning("DbContext connection failed");
                return StatusCode(503, new
                {
                    status = "unhealthy",
                    dbContext = "disconnected",
                    timestamp = DateTime.UtcNow
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "DbContext connection failed");
            return StatusCode(503, new
            {
                status = "unhealthy",
                dbContext = "error",
                error = ex.Message,
                timestamp = DateTime.UtcNow
            });
        }
    }
}
