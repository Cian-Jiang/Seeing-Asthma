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
  titlePanel("Interactive Hospitalizations Visualisation"),
  sidebarLayout(
    
    # Side Panel
    sidebarPanel(
      
      # User Input for Age
      selectInput("age", "Select Age Group:", choices = unique(data$age_group)),
      
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
      filter(age_group == input$age, sex %in% input$sex)
    
    color_palette <- c("Male" = "purple", "Female" = "green", "All" = "yellow")
    
    # Creating the base ggplot bar plot
    base_plot <- ggplot(filtered_data, aes(x = year, 
                                           y = number_of_hospitalisations, 
                                           fill = sex, 
                                           # Creating a customised tooltip for plotly
                                           text = paste("Year: ", year, 
                                                        "\nNumber of Hospitalisations: ", number_of_hospitalisations, 
                                                        "\nSex: ", sex))) +
      geom_bar(stat = "identity", position = "dodge") +
      scale_fill_manual(values = color_palette) +
      labs(title = "Hospitalisations Over Years",
           x = "Year",
           y = "Number of Hospitalisations",
           fill = "Sex") +
      theme_minimal()
    
    # Converting the ggplot plot to an interactive plotly plot
    interactive_plot <- ggplotly(base_plot, tooltip = c("text"))

    # Displaying the interactive plot
    interactive_plot
    
  })
}

shinyApp(ui = ui, server = server)

