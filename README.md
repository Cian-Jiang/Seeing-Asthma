Here's a README.md for the Seeing Asthma project based on the provided documentation:

# Seeing Asthma


## Table of Contents
1. [Product Overview](#product-overview)
2. [Media](#media)
3. [Architecture](#architecture)
4. [Start Up Requirements](#start-up-requirements)
5. [Installation](#installation)
6. [Database](#database)
7. [Security](#security)
8. [Backup and Recovery](#backup-and-recovery)
9. [Team Information](#team-information) 

## Product Overview

The project "Seeing Asthma" is based on research into the many allergens that are widespread in Australia and pose a serious threat to the health of children with asthma. The main objective of this project is to provide a platform for parents of asthmatic children to learn more effectively and utilize features to better manage their child's asthma through this website.

The Seeing Asthma website is an integrated platform with not only comprehensive asthma knowledge but also many new features to help you better manage your child's asthma. These include a "picture recognition" feature that helps parents identify asthma triggers regardless of location, time, or device. Recommendations for asthma-friendly activities and diets. In addition, animations and games have been developed to promote self-protection awareness, so that children can be taught how to prevent asthma.

## Media

- [Product Video](https://youtu.be/_bjrJoSmcJs)
- [Learning Journey](https://youtu.be/KlgEz3U3ZJo)
- [Elevator Pitch of Seeing Asthma](https://youtu.be/s0P_4FHHbCs)

## Architecture

The system architecture consists of:

- Front-end: Developed using Next.js 13.4.19, hosted on Vercel
- Back-end: Python Flask API, hosted on AWS EC2 instances
- Database: MySQL database hosted on Amazon RDS
- Third-party APIs: YouTube API, Baidu vision API, Google vision API

  ### High Level System Architecture Diagram
    ![image](https://github.com/user-attachments/assets/a492fabc-8d9f-44ea-a677-18a53ed2f1fa)
  ### Database Entity Relation (ER)
    ![image](https://github.com/user-attachments/assets/e6edd633-af73-43c6-8155-f52d4afad3e6)


## Start Up Requirements

### Software Requirements
- Operating System: Windows, macOS, or Linux
- Visual Studio Code 1.82.3 or later (recommended for frontend development)
- Node.js 18.18.0 LTS or later
- Python 3.9.7
- Vercel CLI (for deployment management)

### Data Requirements
- MySQL database (hosted on AWS RDS)
- Access to required third-party APIs

## Installation

### Frontend
1. Clone the repository and checkout the `Shiyu` branch
2. Create a `.env.local` file in the root directory with necessary environment variables
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server

### Backend
1. Clone the repository and checkout the `python-api` branch
2. Install required Python packages listed in `requirements.txt`
3. Configure the Flask app to run on port 5000

For detailed installation instructions, please refer to the Support Document.

## Database

The project uses a MySQL database hosted on AWS RDS. Connection details are provided in the Support Document. The database can be accessed and managed using tools like DataGrip.

## Security

Security measures include:
- SSL/TLS certificates
- Firewalls (including Cloudflare CDN)
- Protection against SQL injections and XSS attacks
- Regular updates of the Next.js framework
- AWS security features and log monitoring
- Periodic penetration testing

## Backup and Recovery

### Database
- Automated daily backups using AWS RDS
- Manual snapshots can be created for important versions
- Restoration can be done through the AWS RDS Snapshots page

### Website
- Source code is stored on GitHub
- Vercel deployment allows for instant rollbacks and version history

## Team Information

Team Name: Healthy Coder
Team Number: TA 09

| Role | Name | LinkedIn |
|------|------|----------|
| Business Analysis | Kaijia Yu | [Kaijia Yu](https://www.linkedin.com/in/kaijia-yu-a8817b289/) |
| Full Stack Engineer | Ridong Jiang | [Ridong Jiang](https://www.linkedin.com/in/ridong-jiang-259716274/) |
| Front-end Engineer | Shiyu Wu | [Shiyu Wu](https://www.linkedin.com/in/shiyu-wu-0a5391219/) |
| Data Specialist | Navrattan Singh Dhillon | [Navrattan Dhillon](https://www.linkedin.com/in/navrattan-dhillon/) |
| Cyber Security Specialist | Sonia Lakhani | [Sonia Lakhani](https://www.linkedin.com/in/sonia-lakhani-37422048/) |

For more detailed information, please refer to the Product Document, Maintenance Document, and Support Document in the Handover Documents folder.
