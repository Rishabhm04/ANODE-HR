# HRMS - Human Resource Management System

A comprehensive, modern HRMS frontend built with React, TypeScript, and Tailwind CSS. This system provides a complete solution for managing human resources, from employee data to payroll processing.

## 🚀 Features

### Core System & Security Architecture
- **Organizational Chart**: Flexible hierarchical structure with role-based access
- **Role-Based Access Control (RBAC)**: Secure access control for different user roles
- **Approval Workflow Engine**: Multi-level configurable approval flows
- **Email Configuration**: SMTP server setup for notifications
- **Master Data Management**: Departments, designations, and holiday calendars

### Employee Data Management
- **Comprehensive Employee Profiles**: Personal, contact, and employment information
- **Advanced Search & Filtering**: Search by name, ID, department
- **Data Actions**: View, edit, delete, and export employee records
- **Bulk Operations**: Mass data management capabilities

### Attendance & Time Management
- **Shift Management**: Multiple shifts with configurable timings
- **Bulk Shift Assignment**: Company-wide, department, or individual assignments
- **Biometric Integration**: API support for fingerprint/face recognition
- **Online Punching**: Web/mobile clock-in/out with geolocation
- **Attendance Summary**: Comprehensive attendance tracking
- **Outdoor Activity**: Field work application and tracking
- **Time Adjustment**: Request-based time corrections

### Leave Management
- **Leave Balance Logic**: Automatic balance calculation and tracking
- **Leave Application**: Employee self-service leave requests
- **Balance Validation**: Prevents over-booking with feedback
- **Leave Policy Creation**: Customizable leave policies
- **Status Tracking**: Real-time approval status monitoring

### Payroll & Finance
- **Allowance Configuration**: Fixed amount or percentage-based allowances
- **Deduction Formulas**: Flexible PF, SS, and tax calculations
- **Loan & Advance Module**: Employee loan management
- **Payroll Run**: Automated payroll processing
- **Payslip Generation**: Detailed payslip with breakdown
- **Payslip Access**: Employee self-service payslip viewing

### Performance Management
- **Template Management**: Customizable evaluation forms
- **Evaluation Input**: Supervisor and peer feedback
- **Formula-Based Reporting**: Automated performance scoring
- **Goal Setting**: Performance goal tracking and management

### Reporting & Analytics
- **Custom Report Builder**: Flexible report generation
- **Advanced Filtering**: Department, employee, and date range filters
- **Column Selector**: Customizable report columns
- **Data Export**: Excel, PDF, and CSV export options
- **Visual Analytics**: Charts and graphs for data visualization

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development**: ESLint, Prettier

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hrms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   └── Layout.tsx              # Main layout with sidebar
├── pages/
│   ├── Dashboard.tsx           # Main dashboard
│   ├── EmployeeManagement.tsx # Employee CRUD operations
│   ├── AttendanceManagement.tsx # Attendance tracking
│   ├── LeaveManagement.tsx    # Leave management
│   ├── PayrollManagement.tsx # Payroll processing
│   ├── PerformanceManagement.tsx # Performance reviews
│   ├── Reports.tsx           # Analytics and reporting
│   └── Settings.tsx          # System configuration
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#3b82f6)
- **Secondary**: Gray shades (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Components
- **Cards**: Consistent card layouts for content
- **Tables**: Responsive data tables with sorting
- **Forms**: Styled form inputs with validation
- **Buttons**: Primary, secondary, and outline variants
- **Modals**: Overlay dialogs for forms and details

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=HRMS
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom component classes
- Responsive design utilities

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile**: Optimized sidebar navigation
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full feature set with optimal spacing

## 🔐 Security Features

- **Role-Based Access**: Different access levels for users
- **Session Management**: Configurable session timeouts
- **Password Policies**: Enforceable password requirements
- **Audit Logging**: Track system activities
- **Two-Factor Authentication**: Enhanced security options

## 📊 Analytics & Reporting

### Built-in Reports
- **Attendance Reports**: Daily, weekly, monthly summaries
- **Payroll Reports**: Salary and deduction breakdowns
- **Leave Reports**: Leave patterns and trends
- **Performance Reports**: Evaluation summaries
- **Employee Reports**: Directory and demographic data

### Custom Report Builder
- **Data Sources**: Select from multiple data sources
- **Filters**: Advanced filtering options
- **Formats**: Excel, PDF, CSV export
- **Scheduling**: Automated report generation

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Version History

- **v1.0.0**: Initial release with core HRMS features
- **v1.1.0**: Added performance management
- **v1.2.0**: Enhanced reporting and analytics
- **v1.3.0**: Mobile responsiveness improvements

## 🎯 Roadmap

- [ ] Mobile app integration
- [ ] Advanced analytics dashboard
- [ ] API integration
- [ ] Multi-language support
- [ ] Advanced workflow automation
- [ ] Integration with external systems

---

**Built with ❤️ for modern HR management**
