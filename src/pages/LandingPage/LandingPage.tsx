import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import "highlight.js/styles/monokai.css";
import RestAPIUsers from "../../components/RestAPIUsers/RestAPIUsers";
import { getUserData } from "../../actions/api/get/getUserData";
import { RestAPIUser } from "../../lib/types";

hljs.registerLanguage("javascript", javascript);

const LandingPage = () => {
  const codeRef = useRef<HTMLElement | null>(null);
  const sampleRef = useRef<HTMLElement | null>(null);
  const [users, setUsers] = useState<RestAPIUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const codeSnippet = `
  const getUserData = async () => {
    try {
      const APIUrl = "https://jsonplaceholder.typicode.com/users";

      const response = await fetch(APIUrl);
      if (!response.ok) {
        throw new Error(\`HTTP Error! Status: \${response.status}\`);
      }

      const data = await response.json();
      return data;
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        throw new Error("Error: URL Error");
      } else {
        throw new Error("Unknown Error");
      }
    }
  };
  `;

  const dataSample = `"id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }`;

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const users = await getUserData();
      setUsers(users);
      console.log("Users: ", users);
    } catch (error: Error | any) {
      if (error instanceof Error) {
        console.log("Error retrieving user data: ", error.message);
      } else {
        console.log("Unknown Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
    if (sampleRef.current) {
      hljs.highlightElement(sampleRef.current);
    }
  }, []);

  return (
    <div className="landing-page-container">
      <div className="landing-page-content-container">
        <div className="landing-page-header">
          <h1>Welcome to ITPE API Integration Lab</h1>
        </div>
        <div className="landing-page-main-content">
          <p>
            This page provides an overview of how APIs work and demonstrates how
            to fetch data from an external API using JavaScript and React.
          </p>

          <h2>Understanding APIs</h2>
          <p>
            APIs (Application Programming Interfaces) are used to enable
            communication between different software systems. In web
            development, an API is often used to request data from a server. For
            example, you might use an API to get user data from a remote
            database or service.
          </p>

          <h3>Step 1: Define the API Endpoint</h3>
          <p>
            To fetch data from an API, you first need the API URL. In this
            example, we will use the following endpoint:<span> </span>
            <mark>https://jsonplaceholder.typicode.com/users</mark>.
          </p>
          <p>
            This API provides a list of sample users that we can use for testing
            and learning purposes.
          </p>

          <h3>Step 2: Writing the Code to Fetch Data</h3>
          <p>
            Next, we'll write the code to fetch the data from the API. Here's
            the JavaScript code for fetching data using the <code>fetch</code>{" "}
            method:
          </p>
          <pre>
            <code className="javascript" ref={codeRef}>
              {codeSnippet}
            </code>
          </pre>
          <p>
            In the code above, we use an <code>async</code> function named{" "}
            <code>getUserData</code> to handle the data retrieval. We use a{" "}
            <code>try...catch</code> block to handle any potential errors that
            may occur while fetching the data.
          </p>

          <h3>Step 3: Handling the Response</h3>
          <p>
            Once the data is fetched, we check if the response is valid by using
            the <code>response.ok</code> property. If not, we throw an error
            with the HTTP status. After receiving the data, we return it as JSON
            format, which can then be used by our application.
          </p>

          <h3>Step 4: Using the Fetch Function</h3>
          <p>
            We can now use this function in our React component to fetch data
            from the provided API. Click the button below to fetch the data:
          </p>
          <button onClick={handleGetUsers}>Fetch Data</button>

          {!users ? (
            <p>Loading Users...</p>
          ) : !isLoading ? (
            <RestAPIUsers users={users} />
          ) : (
            ""
          )}
          <p>
            The fetched data's structure should look like the following example:
          </p>
          <pre>
            <code className="javascript" ref={sampleRef}>
              {dataSample}
            </code>
          </pre>
          <h3>Understanding the Results</h3>
          <p>
            The fetched data is displayed Above. If there is an error during the
            fetch, it will be logged in the console.
          </p>
          <h3>Conclusion</h3>
          <p>
            In this example, we've demonstrated how to fetch data from an
            external API using JavaScript and React. By understanding the basics
            of APIs, you can efficiently integrate external data sources into
            your applications, enhancing their functionality and interactivity.
          </p>
          <p>
            Remember, when working with APIs, it's essential to handle errors
            gracefully and ensure your application can manage various network
            issues. Proper error handling, as shown in the example, allows your
            app to provide feedback to the user when something goes wrong.
          </p>

          <h3>Closing Remarks</h3>
          <p>
            We hope this tutorial has provided a clear understanding of how to
            use APIs in your React applications. Feel free to explore other APIs
            and try implementing similar methods for data fetching. Practice
            will help you become more comfortable with integrating APIs and make
            your web applications more powerful and versatile.
          </p>
          <p>
            <strong>
              Thank you for visiting the ITPE API Integration Lab. Happy coding!
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
