if(!require(shiny)) install.packages("shiny", repos = "http://cran.us.r-project.org")
if(!require(ggplot2)) install.packages("ggplot2", repos = "http://cran.us.r-project.org")
if(!require(RMySQL)) install.packages("RMySQL", repos = "http://cran.us.r-project.org")
if(!require(plotly)) install.packages("plotly", repos = "http://cran.us.r-project.org")


# Connecting to Database
connection <- dbConnect(RMySQL::MySQL(), host = "database-1.cbycmzyztg27.us-east-1.rds.amazonaws.com", dbname = "MAINDB",
                        user = "cianjiang597", password = "Fk6DJEwzPY7x")

# Querying data from the database
data <- dbGetQuery(connection, "SELECT * FROM Hospitalisation")

# Closing the database connection
on.exit(dbDisconnect(connection))

# UI section
ui <- fluidPage(
  titlePanel("Interactive Hospitalizations Visualisation 2"),
  sidebarLayout(
    
    # Side Panel
    sidebarPanel(
      
      # User Input for Year
      selectInput("year", "Select Year:", choices = unique(data$year)),
      
      # Multiple inputs can be selected
      selectizeInput("sex", "Select Sex:", 
                     choices = unique(data$sex),
                     selected = 'Male',
                     multiple = TRUE),
    ),
    
    # Main Panel
    mainPanel(
      plotlyOutput("hospitalisation_plot")
    )
  )
)

# Sever section
server <- function(input, output) {
  
  # 
  output$hospitalisation_plot <- renderPlotly({
    
    # Validating that user has selected a value
    validate(need(!is.null(input$sex), "Please provide an Input from 'Select Sex:'"))
    
    # Filtering the data based on user input
    filtered_data <- data %>%
      filter(year == input$year, sex %in% input$sex)
    
    color_palette <- c("Male" = "purple", "Female" = "green", "All" = "yellow")
    
    # Creating the base ggplot bar plot
    base_plot <- ggplot(filtered_data, aes(x = age_group, 
                                           y = number_of_hospitalisations, 
                                           fill = sex, 
                                           # Creating a customised tooltip for plotly
                                           text = paste("Age Group: ", age_group, 
                                                        "\nNumber of Hospitalisations: ", number_of_hospitalisations, 
                                                        "\nSex: ", sex))) +
      geom_bar(stat = "identity", position = "dodge") +
      scale_fill_manual(values = color_palette) +
      labs(title = "Hospitalisations Over Years",
           x = "Age Group",
           y = "Number of Hospitalisations",
           fill = "Sex") +
      theme_minimal() + 
      theme(axis.text.x = element_text(angle = 90, vjust = 0.5))
    
    # Converting the ggplot plot to an interactive plotly plot
    interactive_plot <- ggplotly(base_plot, tooltip = c("text"))
    
    # Displaying the interactive plot
    interactive_plot
    
  })
}

shinyApp(ui = ui, server = server)

