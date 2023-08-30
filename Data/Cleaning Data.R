library(readxl)
library(dplyr)

hospitalisations <- read_excel("Chronic-respiratory-conditions-hospitals-data-2023.xlsx", 
                               sheet='Table Resp APC.1')

hospitalisations <- hospitalisations %>% slice(-(1:3))

colnames(hospitalisations) <- hospitalisations[1, ]
hospitalisations <- hospitalisations[-1, ]

hospitalisations <- hospitalisations %>%
  filter(Condition == "Respiratory - chronic lower respiratory - asthma", 
         hospitalisations$`Diagnosis scope` == "1. Principal diagnosis of condition")

hospitalisations <- hospitalisations %>%
  filter((`Age` %in% c("0 –   4 years",
                        "5 –   9 years",
                        "10 –  14 years",
                        "15 –  19 years",
                        "20 –  24 years",
                        "25 –  29 years",
                        "30 –  34 years",
                        "35 –  39 years",
                        "40 –  44 years",
                        "45 –  49 years",
                        "50 –  54 years",
                        "55 –  59 years",
                        "60 –  64 years",
                        "65 –  69 years",
                        "70 –  74 years",
                        "75 –  79 years",
                        "80 –  84 years",
                        "85+ years",
                        "All ages")))

hospitalisations <- hospitalisations %>%
  select(Year, Sex, Age, Hospitalisations) %>%
  rename(age_group = Age, year = Year, sex = Sex, number_of_hospitalisations = Hospitalisations)

hospitalisations <- hospitalisations %>%
  mutate(sex = case_when(
    sex == 'Males' ~ 'Male',
    sex == 'Females' ~ 'Female',
    sex == 'Persons' ~ 'All'
  ))

hospitalisations[hospitalisations$age_group == '5 –   9 years', "age_group"] <- '05 –   9 years'

age <- hospitalisations %>%
  distinct(age_group)

year <- hospitalisations %>%
  distinct(year)

sex <- hospitalisations %>%
  distinct(sex)

write.csv(hospitalisations, file = "hospitalisations.csv", row.names = FALSE)
write.csv(age, file = "age_hospitalisations.csv", row.names = FALSE)
write.csv(year, file = "year_hospitalisations.csv", row.names = FALSE)
write.csv(sex, file = "sex_hospitalisations.csv", row.names = FALSE)