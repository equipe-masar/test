# Future Improvements

This document tracks potential improvements for future iterations.

## Security Enhancements

### Database Credentials
- **Current**: Hardcoded passwords in setup scripts for development
- **Improvement**: Consider using environment variables or secure credential storage
- **Priority**: Medium (current approach is acceptable for development, must be changed for production)
- **Note**: All scripts clearly document that credentials are for development only

## Code Quality

### Entity Framework Models
- **Current**: DateTime.UtcNow used as property initializers in model classes
- **Improvement**: Consider using DateTimeOffset for better timezone handling, or set default values in DbContext
- **Priority**: Low (current approach works correctly)
- **Note**: This is a common pattern in .NET and functions as expected

## Features

### Database Migrations
- **Current**: SQL scripts for database setup
- **Future**: Consider adding EF Core migrations for easier schema evolution
- **Priority**: Low (SQL scripts work well for initial setup)

### Automated Testing
- **Current**: Manual health check endpoints
- **Future**: Add automated integration tests for both backends
- **Priority**: Medium

### Monitoring
- **Current**: Basic health check endpoints
- **Future**: Add application monitoring (Application Insights, Prometheus, etc.)
- **Priority**: Low

## Documentation

### Video Tutorial
- **Future**: Create video walkthrough of setup process
- **Priority**: Low

### Architecture Diagrams
- **Future**: Add visual architecture diagrams
- **Priority**: Low

## Notes

These improvements are not blockers for the current PR. The current implementation meets all acceptance criteria and definition of done requirements.
