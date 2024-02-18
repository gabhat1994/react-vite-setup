import { Document, Font, G, Image, Line, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

Font.register({
    family: '"Suisse Int\'l", sans-serif',
    src: '/build/fonts/SuisseIntl-Regular.ttf'
});
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        // backgroundColor: '#E4E4E4'
        margin: "20px",
        fontFamily: '"Suisse Int\'l", sans-serif',
        lineHeight: "1.5px"
    },
    SummaryHeader: {
        flexDirection: 'row',
        marginTop: "20px",
        fontWeight: "extrabold"
    },
    expertHeader: {
        marginTop: "50px"
    },
    goalsHeader: {
        flexDirection: 'row',
        marginTop: "20px",
        fontWeight: "extrabold"
    },
    expertHeader1: {
        flexDirection: 'row',
        marginTop: "20px"
    },
    separator: {
        marginTop: "10px",
        marginBottom: "-11px",
        borderTop: "1px solid rgb(247, 247, 248)"
    },
    textHeader: {
        fontSize: "20px",
        fontWeight: 600
    },
    textGray: {
        color: "rgb(133, 128, 145)",
        fontSize: "10px",
        fontWeight: 400
    },
    textBlack: {
        fontSize: "10px"
    },
    textBlackBold: {
        fontSize: "10px",
        fontWeight: 600,
        padding: "2px",
        borderRadius: "2px",
    },
    textPurpleBold: {
        fontSize: "10px",
        fontWeight: 600,
        color: "#663FBA",
        padding: "2px",
        borderRadius: "2px",
        backgroundColor: "rgb(242, 238, 254)",
        margin: "0",
        alignSelf : "flex-start"
    },
    expertContainer: {
        padding: "10px 10px",
        marginRight: "35px",
    },
    expertInnerContainer: {
        borderRadius: "8px",
        padding: "0px 20px"
    },
    expertBodyText: {
        fontSize: "12px"
    },
    expertRegards: {
        fontSize: "10px",
        color: "rgb(133, 128, 145)"
    },
    expertName: {
        fontSize: "13px",
        fontWeight: 600,
    },
    expertSpecialist: {
        fontSize: "9px",
        color: "rgb(133, 128, 145)"
    },
    goalsSectionHeader: {
        fontSize: "12px",
        fontWeight: "extrabold",
        margin: "10px 0"
    },
    goalsGoal: {
        padding: "5px 0",
        flexDirection: "row"
    },
    goalsGoalItem: {
        marginTop: "5px",
        flexDirection: "column",
        width: "50%"
    },
    goalLabel: {
        fontSize: "12px",
        color: "rgb(133, 128, 145)"
    },
    goalValue: {
        fontSize: "12px"
    }

});

function Separator() {
    return (
        <View style={styles.separator}><Text> </Text></View>
    )
}
function GoalSvg(goal: { labelCurrent: string, valueCurrent: number, labelPredicted: string, valuePredicted: number }) {
    const barHeight = 200;
    const max = Math.max(goal.valueCurrent, goal.valuePredicted) || 1;
    const height = {
        current: barHeight + 70 - Math.floor((goal.valueCurrent * barHeight)/max),
        predicted: barHeight + 70 - Math.floor((goal.valuePredicted * barHeight)/max)
    };
    return (
        <Svg height="310" width="500">
            <G>
                <G>
                    {/* top legend */}
                    <Text fill="rgb(133, 128, 145)" style={{ fontSize: "12px" }} x={40} y={20}>{goal.labelCurrent}</Text>
                    <Text style={{ fontSize: "12px", fontWeight: "extrabold" }} x={40} y={40}>{goal.valueCurrent}</Text>
                    <Text fill="rgb(133, 128, 145)" style={{ fontSize: "12px" }} x={170} y={20}>{goal.labelPredicted}</Text>
                    <Text style={{ fontSize: "12px", fontWeight: "extrabold" }} x={170} y={40}>{goal.valuePredicted}</Text>
                </G>
                <G>
                    {/* bottom legend */}
                    <Line
                        stroke-dasharray="3 3"
                        stroke="'#663FBA'"
                        fill="none"
                        font-size="3px"
                        x1={40} y1={285}
                        x2={50} y2={285} />
                    <Text fill="rgb(133, 128, 145)" style={{ fontSize: "10px" }} x={53} y={290}>{goal.labelCurrent}</Text>
                    <Line
                        stroke-dasharray="3 3"
                        stroke="'#00CA7A'"
                        fill="none"
                        font-size="3px"
                        x1={170} y1={285}
                        x2={180} y2={285} />
                    <Text fill="rgb(133, 128, 145)" style={{ fontSize: "10px" }} x={183} y={290}>{goal.labelPredicted}</Text>
                </G>
                <G>
                    {/* chart horizontal lines */}
                    {[200, 150, 100, 50, 0].map((y) => <Line
                        stroke-dasharray="3 3"
                        stroke="#ccc"
                        fill="none"
                        x1={30} y1={y + 70}
                        x2={290} y2={y + 70} />
                    )}
                </G>
                <G>
                    {/* chart vertical line */}
                    <Line
                        font-size="3px"
                        stroke="#ccc"
                        fill="none"
                        x1="30"
                        y1="270"
                        x2="30"
                        y2="70" />
                </G>
                <G>
                    {/* chart vertical lines legend */}
                    {[200, 150, 100, 50, 0].map((y, i) => <><Line
                        stroke-dasharray="3 3"
                        stroke="#ccc"
                        fill="none"
                        x1={23} y1={y + 70}
                        x2={30} y2={y + 70} />
                        <Text fill="rgb(133, 128, 145)" style={{ fontSize: "10px" }} x={5} y={y + 75}>{i * max / 4}</Text>
                    </>
                    )}
                </G>
                <G>
                    {/* current value bar */}
                    {/* <Path fill='#663FBA' d="M140 80 Q140 70 130 70 L50 70 Q40 70 40 80 L40 270 L140 270 z" /> */}
                    {
                        height.current >= 10 && 
                        <Path fill='#663FBA' d={`M140 ${height.current + 10} Q140 ${height.current} 130 ${height.current} L50 ${height.current} Q40 ${height.current} 40 ${height.current + 10} L40 270 L140 270 z`} />
                    }
                    
                </G>
                <G>
                    {/* predicted value bar */}
                    {/* <Path fill='#00CA7A' d="M270 80 Q270 70 260 70 L180 70 Q170 70 170 80 L170 270 L270 270 z" /> */}
                    {
                        height.predicted >= 10 && 
                        <Path fill='#00CA7A' d={`M270 ${height.predicted + 10} Q270 ${height.predicted} 260 ${height.predicted} L180 ${height.predicted} Q170 ${height.predicted} 170 ${height.predicted + 10} L170 270 L270 270 z`} />
                    }
                </G>
            </G>
        </Svg>)
}
// Create Document Component
export function PdfOffer() {
    const summary = [
        [
            { label: "Start Date:", value: "11/5/2023" },
            { label: "Estimated End Date:", value: "11/5/2023" },
            { label: "Estimated Duration:", value: "8 days" },
            { label: "Noum:", value: "SSR QA" }
        ], [
            { label: "Estimated Total Cost:", value: "11 USD", isHilighted: true },
            { label: "Weekly Cost:", value: "11 USD" },
            { label: "Est. Weekly Clicks:", value: "311" },
            { label: "Avg. cost per click:", value: "11 USD" },
            { label: "Reach", value: "11" }
        ], [
            { label: "Audience:", value: "sdewdde" },
            { label: "Location:", value: "Algeria" },
            { label: "Language:", value: "English (US)" }
        ]
    ];
    const expertBody = "\nI am pleased to present to you our comprehensive advertising campaign proposal, tailored specifically to meet the unique needs and goals of your business.\n\nOur team of experts have conducted thorough research and analysis to develop an effective strategy that leverages the latest industry trends and technologies to achieve your desired outcomes. Our proposal includes a detailed plan for executing targeted campaigns across multiple channels, including social media, search engine advertising, and display advertising.\n\nWe believe that this campaign will not only increase your brand visibility and reach, but also drive significant returns on investment. Our estimated budget and timeline are outlined in the attached proposal, and we would be happy to discuss any questions or concerns you may have.\n\nPlease let us know if you would like to schedule a call to discuss further. We look forward to the opportunity to partner with you and drive success for your business.\n\n"

    const chartSections = [{
        name: "Increase my Noum Visibility",
        goals: [{
            labelCurrent: "Current Views (Avg.)",
            labelPredicted: "Predicted",
            valueCurrent: 2,
            valuePredicted: 2
        }]
    },
    {
        name: "Gain Connected Users and Followers",
        goals: [{
            labelCurrent: "Current Users",
            labelPredicted: "Predicted",
            valueCurrent: 2,
            valuePredicted: 14

        }, {
            labelCurrent: "Current Followers",
            labelPredicted: "Predicted",
            valueCurrent: 2,
            valuePredicted: 12
        }
        ]
    }];
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.SummaryHeader}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.textHeader}>Summary</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textGray}>Campaign:&nbsp;</Text>
                <Text style={styles.textBlackBold}>test*</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'right',
                marginRight: '40px',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textGray}>29/5/2023 1:19 PM ID: </Text>
              <Text style={styles.textBlack}> ADS-37</Text>
            </View>
          </View>
          {summary.map((row) => (
            <>
              <Separator />
              <View style={{ flexDirection: 'row' }}>
                {row.map((item) => (
                  <View style={{ flexDirection: 'column', width: '20%' }}>
                    <Text style={styles.textGray}>{item.label}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      {item.label === 'Noum:' ? (
                        <Image
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '8px',
                          }}
                          src={{
                            uri: 'https://noumena-img.s3-accelerate.amazonaws.com/noum.rXxO2XMn.jpg',
                            method: 'GET',
                            headers: { 'Cache-Control': 'no-cache' },
                            body: '',
                          }}
                        />
                      ) : null}
                      <Text
                        style={
                          item.isHilighted
                            ? styles.textPurpleBold
                            : styles.textBlackBold
                        }
                      >
                        {item.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ))}
          <View style={styles.expertHeader}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.textHeader}>Message From Our Expert</Text>
            </View>
          </View>
          <Separator />
          <View style={[styles.expertContainer]}>
            <View style={styles.expertInnerContainer}>
              <Text style={styles.expertBodyText}>Dear JOHN,</Text>
              <Text style={styles.expertBodyText}>{expertBody}</Text>
              <Text style={styles.expertRegards}>Best Regards,</Text>
              <View style={{ flexDirection: 'row', gap : "8px", marginTop:"8px" }}>
                <Image
                  style={{ width: '40px', height: '40px', borderRadius: '12px' }}
                  src={{
                    uri: 'https://noumena-img.s3-accelerate.amazonaws.com/noum.rXxO2XMn.jpg',
                    method: 'GET',
                    headers: { 'Cache-Control': 'no-cache' },
                    body: '',
                  }}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.expertName}>JEFF Givera</Text>
                  <Text style={styles.expertSpecialist}>SEO Specialist</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.goalsHeader}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.textHeader}>Goals</Text>
            </View>
          </View>
          <Separator />
          {chartSections.map((section, index) => (
            <View>
              <Text style={styles.goalsSectionHeader}>
                {index + 1}. {section.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {section.goals.map((goal) => (
                  <View style={styles.goalsGoal}>
                    <View style={{ width: '300px', height: '310px' }}>
                      <GoalSvg {...goal} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Page>
      </Document>
    );
}

