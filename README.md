# Tax Loss Harvesting Tool

## Overview

The Tax Loss Harvesting Tool is a comprehensive web application designed to help cryptocurrency investors optimize their tax liability by strategically harvesting losses in their portfolio. This tool visualizes how selling certain assets at a loss can offset capital gains tax, potentially resulting in significant tax savings.

## Features

### Core Functionality
- **Capital Gains Overview**: Compare your tax liability before and after harvesting losses
- **Holdings Management**: View and manage your cryptocurrency holdings
- **Tax Loss Simulation**: Select assets with losses to see how they impact your overall tax burden
- **Detailed Insights**: Get a clear breakdown of short-term and long-term capital gains

### Additional Features
- **Filtering & Sorting**: Easily find assets by name, value, or profit/loss status
- **Data Export**: Generate detailed CSV or JSON reports for tax filing or consultation
- **Historical Analysis**: Track your tax savings over time with historical comparisons
- **Price Trends**: Visualize cryptocurrency price trends to inform your decisions
- **Collapsible Views**: Use the "View All/Less" feature to focus on specific holdings

## How It Works

### Tax Loss Harvesting Strategy
1. **Identify Losses**: The tool identifies cryptocurrency assets currently at a loss
2. **Simulate Selling**: Select assets you want to harvest for tax purposes
3. **Calculate Savings**: See how your tax liability changes when these losses offset gains
4. **Optimize Combinations**: Try different combinations of assets to maximize tax savings

### Key Benefits
- **Maximize Tax Efficiency**: Use capital gains for the fiscal year to their maximum potential
- **Strategic Planning**: Sell assets you plan to sell at a loss to reduce overall tax liability
- **Optimization Options**: Experiment with different combinations to find the best tax outcome

## Technical Details

### Front-End
- Built with React and TypeScript for a robust, type-safe application
- Uses TanStack Query for efficient data fetching and caching
- Implements React Context for centralized state management
- Features responsive design with Tailwind CSS and Radix UI components

### Back-End
- Express.js server with RESTful API endpoints
- Data persistence with PostgreSQL database and Drizzle ORM
- Type-safe schema design shared between front-end and back-end

### Data Visualization
- Interactive charts for historical analysis
- Price trend visualization for informed decision-making
- Clear visual indicators for gains and losses

## Important Notes and Disclaimers

- **Tax Advice**: This tool is for educational purposes only and does not constitute tax, legal, or financial advice
- **Data Accuracy**: Cryptocurrency data may not reflect real-time market values
- **Jurisdiction Considerations**: Tax laws vary by location and individual circumstances
- **Professional Consultation**: Always consult with a qualified tax professional before implementing any tax strategy
- **Wash Sale Rules**: Be aware of wash sale rules in your jurisdiction that may limit tax harvesting benefits

## Getting Started

1. View your current holdings and capital gains
2. Use filters to focus on assets with losses
3. Select holdings to harvest and observe the impact on your tax liability
4. Export detailed reports for your records or tax advisor
5. Explore historical data and price trends for additional insights

Start optimizing your cryptocurrency tax strategy today with the Tax Loss Harvesting Tool!