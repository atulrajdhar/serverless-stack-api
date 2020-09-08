export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            // Run the Lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            // Print out the full error
            // console.log(e);

            body = { error: e.message };
            statusCode = 500;
        }

        // Return HTTP response
        return {
            statusCode,
            body: JSON.stringify(body),
            // Set response headers to enable CORS (Cross-Origin Resource Sharing)
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
        };
    };
}