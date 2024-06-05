"use client";

import { Document, Page, Text, Path, Image, Svg, View, StyleSheet, PDFDownloadLink, Font } from "@react-pdf/renderer";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { useEffect, useState } from "react";

Font.register({ family: "heading", src: "/fonts/CalSans-SemiBold.woff" });
Font.register({ family: "normal", src: "/fonts/Inter-Regular.ttf" });
Font.register({ family: "normalBold", src: "/fonts/Inter-Bold.ttf" });

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#E4E4E4",
        padding: 35, // A4 paper margins are typically 35pt
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontFamily: "heading",
        marginBottom: 10,
        fontSize: 18, // Setting a larger font size for titles
        color: "#0f172a", // Strong dark blue color for titles
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoTitle: {
        fontFamily: "normalBold",
        fontWeight: "bold",
        fontSize: 12, // Using a legible font size for A4 paper
        color: "#333333",
        marginLeft: 4, // Dark color for logo title
    },
    point: {
        fontFamily: "normal",
        fontSize: 14, // Using a legible font size for A4 paper
        marginBottom: 10, // Add some space between lines
        color: "#333333", // Dark color for text
    },
    pageNumbers: {
        fontFamily: "normal",
        position: "absolute",
        fontSize: 12,
        bottom: 30, // Positioning page numbers at the bottom with some margin
        right: 35, // Aligning page numbers to the right margin
        color: "#666666", // Subdued color for page numbers
    },

    documentTitle: {
        fontFamily: "heading",
        fontSize: 32,
        textAlign: "center",
        marginBottom: 20,
        color: "#0f172a", // Strong dark blue color for document title
    },
    documentSubtitle: {
        fontFamily: "normal",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#333333", // Dark color for document subtitle
    },
    bulletPoint: {
        flexDirection: "row", // Here we apply Flexbox layout to make the bullet point and the text appear on the same line
        alignItems: "flex-start", // Align items vertically in the center
    },
    bulletSymbol: {
        width: 20, // Provide sufficient width for the bullet point
        color: "#333333", // Dark color for bullet points
    },
});

const Logo = () => {
    return (
        <Svg width="30" height="50" viewBox="0 0 77 110">
            <Path
                d="M3 58.5C2.17157 58.5 1.5 59.1716 1.5 60V106.749C1.5 107.577 2.17157 108.249 3 108.249H40C40.8284 108.249 41.5 107.577 41.5 106.749V64.9865C41.5 64.516 41.2792 64.0727 40.9036 63.7892L34.2965 58.8027C34.0362 58.6063 33.719 58.5 33.3929 58.5H3Z"
                stroke="#646363"
                stroke-width="3"
                stroke-linejoin="round"
            />
            <Path
                d="M24 19.5C23.1716 19.5 22.5 20.1716 22.5 21V83C22.5 83.8284 23.1716 84.5 24 84.5H73.0709C73.8994 84.5 74.5709 83.8284 74.5709 83V27.6133C74.5709 27.1428 74.3501 26.6995 73.9745 26.416L65.2119 19.8027C64.9516 19.6063 64.6344 19.5 64.3083 19.5H24Z"
                stroke="#646363"
                stroke-width="3"
                stroke-linejoin="round"
            />
            <Path
                d="M3 1.5C2.17157 1.5 1.5 2.17157 1.5 3V50C1.5 50.8284 2.17157 51.5 3 51.5H40.1989C41.0274 51.5 41.6989 50.8284 41.6989 50V8.01333C41.6989 7.54279 41.4781 7.09951 41.1025 6.81605L34.4599 1.80272C34.1996 1.60627 33.8824 1.5 33.5563 1.5H3Z"
                stroke="#646363"
                stroke-width="3"
                stroke-linejoin="round"
            />
        </Svg>
    );
};

// Create Document Component
const MyDocument = ({ data, type }: any) => (
    <Document>
        <Page style={styles.page} size={"A4"}>
            <View style={styles.logoContainer}>
                <Logo /> <Text style={styles.logoTitle}>Legalysis</Text>
            </View>

            {type == "analysis" ? (
                <>
                    <Text style={styles.documentTitle}>Analysis Result</Text>

                    {data.map((item: any, index: number) => {
                        const title =
                            item.Description.result.title.charAt(0).toUpperCase() +
                            item.Description.result.title.slice(1).toLowerCase();
                        const [firstPoint, ...remainingPoints] = item.Description.result.analysisPoints;

                        return (
                            <View key={index} style={styles.section}>
                                <View wrap={false}>
                                    <Text style={styles.title}>{title}</Text>
                                    <View style={styles.bulletPoint} wrap={false} break={false}>
                                        <Text style={styles.bulletSymbol}>&#x2022;</Text>
                                        <Text style={styles.point}>{firstPoint}</Text>
                                    </View>
                                </View>

                                {remainingPoints.map((point: string, pointIndex: number) => (
                                    <View key={pointIndex} style={styles.bulletPoint} wrap={false} break={false}>
                                        <Text style={styles.bulletSymbol}>&#x2022;</Text>
                                        <Text style={styles.point}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        );
                    })}
                </>
            ) : (
                <>
                    <Text style={styles.documentTitle}>Summarization Result</Text>

                    <View style={styles.section}>
                        <Text style={styles.point}>{data}</Text>
                    </View>
                </>
            )}

            <Text
                style={styles.pageNumbers}
                render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
                fixed
            />
        </Page>
    </Document>
);

// Create a component that uses the Document component
const AnalysisReport = ({ result, type }: any) => {
    const [firstTime, setFirstTime] = useState(true);
    useEffect(() => {
        setFirstTime(false);
    }, []);

    if (firstTime) {
        return <></>;
    }

    if (!result) {
        return <div className={cn(buttonVariants({ size: "lg" }), "right-2 ")}>Loading document...</div>;
    }

    let data = "";
    if (type == "analysis") {
        data = JSON.parse(result);
    } else {
        data = result;
    }

    return (
        <PDFDownloadLink
            document={<MyDocument data={data} type={type} />}
            fileName={type == "analysis" ? "analysis.pdf" : "summary.pdf"}
            className={cn(buttonVariants({ size: "lg" }), "right-2 ")}
        >
            {({ blob, url, loading, error }) =>
                loading ? (
                    "Loading document..."
                ) : (
                    <span className="flex items-center justify-center text-sm">
                        Download PDF <Icons.post className="ml-3" />
                    </span>
                )
            }
        </PDFDownloadLink>
    );
};

export default AnalysisReport;
