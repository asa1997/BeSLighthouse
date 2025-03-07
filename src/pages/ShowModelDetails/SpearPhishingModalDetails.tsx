import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { colorCode } from './SummaryDashboard'

function SpearPhishingModalDetails(data: any) {
    const testName = 'Spear Phishing'
    const testDetail =
        'test evaluate how effectively LLMs execute targeted phishing attacks, measuring their persuasive abilities and manipulation tactics through multi-churn conversations with victim models to achieve specific malicious objectives in controlled test environments.'
    const totalChallenges =
        data?.model_stats?.total_challenges_processed ?? 'Not available'
    const overralScore =
        data?.model_stats?.overall_score_average ?? 'Not available'
    const rapportScore = data?.model_stats?.rapport_average ?? 'Not available'
    const persusassionScore =
        data?.model_stats?.persuasion_average ?? 'Not available'
    const argumentationScore =
        data?.model_stats?.argumentation_average ?? 'Not available'
    return {
        testName,
        testDetail,
        totalChallenges,
        overralScore,
        rapportScore,
        persusassionScore,
        argumentationScore,
    }
}

export const SpearPhishingModal = ({ spearPhishingData, modelName }: any) => {
    const spearPhishingDetails: any =
        Object.keys(spearPhishingData).length > 0
            ? SpearPhishingModalDetails(spearPhishingData)
            : 0
    const spearPhishingCategories: any[] = Object.keys(
        spearPhishingData.goal_stats
    )
    const spearPhishingBarData = Array.from(spearPhishingCategories).map(
        (category) => ({
            category: category,
            overall_average:
                spearPhishingData?.goal_stats[category][modelName] || '0',
        })
    )
    const spearPhishingScoreData = [
        {
            name: 'Argumentation Score',
            value: spearPhishingDetails?.argumentationScore ?? 'Not available',
            text: 'argumentation capabilities was shown by this LLM',
        },
        {
            name: 'Persusassion Score',
            value: spearPhishingDetails?.persusassionScore ?? 'Not available',
            text: 'persuasion capabilities was shown by this LLM',
        },
        {
            name: 'Overall Score',
            value: spearPhishingDetails?.overralScore ?? 'Not available',
            text: 'overall score of this LLM on Spear Phishing Capabilities',
        },
        {
            name: 'Rapport Score',
            value: spearPhishingDetails?.rapportScore ?? 'Not available',
            text: 'rapport building capabilities on a victim LLM',
        },
    ]
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {/* <Grid container spacing={1}> */}
                    <Grid item xs={12} md={6} lg={8}>
                        <Typography id="transition-modal-title">
                            <strong>{spearPhishingDetails.testName}</strong>{' '}
                            {spearPhishingDetails.testDetail}
                        </Typography>
                        {/* </Grid> */}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card
                            sx={{
                                height: '100%',
                                backgroundColor: '#e8e8e8',
                            }}
                        >
                            {Object.keys(spearPhishingData).length === 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 200,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        Spear phishing data not available
                                    </Typography>
                                </Box>
                            ) : (
                                <CardContent sx={{ textAlign: 'center', alignContent: 'center' }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: '2rem',
                                        }}
                                    >
                                        {spearPhishingDetails.totalChallenges}
                                    </Typography>
                                    <Typography variant="body2">
                                        challenges were processed by this LLM to assess its spear phishing capabilities
                                    </Typography>
                                </CardContent>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {/* Left side with bar chart */}
                    <Grid item xs={12} md={6} lg={8}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={spearPhishingBarData}
                                margin={{ right: 20 }}
                                barGap={5}
                            >
                                <XAxis
                                    dataKey="category"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    fontSize={12}
                                />
                                <YAxis domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}/>
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Bar
                                    dataKey="overall_average"
                                    name="Overall average"
                                    fill="#d32f2f"
                                    barSize={5}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>

                    {/* Right side with 2x2 cards */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={2}>
                            {spearPhishingScoreData.map((data: any, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            backgroundColor: '#e8e8e8',
                                        }}
                                    >
                                        {data.value === 'Not available' ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: 200,
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    color="textSecondary"
                                                >
                                                    Data not available for{' '}
                                                    {data.name}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            data.name === 'Overall Score' ? (
                                            <CardContent
                                                sx={{ textAlign: 'center' }}
                                            >
                                                <Typography
                                                    variant="h2"
                                                    sx={{
                                                        fontSize: '1.5rem',
                                                    }}
                                                >
                                                    {data.value}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {data.text}
                                                </Typography>
                                            </CardContent>
                                            ) : (
                                            <CardContent
                                                sx={{ textAlign: 'center' }}
                                            >
                                                <Typography
                                                    variant="h2"
                                                    sx={{
                                                        fontSize: '1.5rem',
                                                        color: colorCode[
                                                            data.value
                                                        ]?.color,
                                                    }}
                                                >
                                                    {
                                                        colorCode[data.value]
                                                            ?.level
                                                    }
                                                </Typography>
                                                <Typography variant="body2">
                                                    {data.text}
                                                </Typography>
                                            </CardContent>
                                            )
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
