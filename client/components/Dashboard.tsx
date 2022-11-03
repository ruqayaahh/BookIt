import * as React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LentOut from "./LentOut";
import Library from "./Library";
import type { Library as LibraryType } from "./Library";
import { fetchLibrary } from "../apis/requests";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const [library, setLibrary] = React.useState<LibraryType | null>(null);
  const [refetch, setRefetch] = React.useState(false);
  const [lentout, setLentout] = React.useState([]);
  const { user_id } = useParams();

  const fetchLibraryFunc = async () => {
    const fetchedLibrary = await fetchLibrary(user_id);
    console.log(fetchedLibrary, "fetchedLibrary");
    setLibrary(fetchedLibrary);
  };
  React.useEffect(() => {
    fetchLibraryFunc();
  }, []);
  React.useEffect(() => {
    if (refetch) {
      fetchLibraryFunc();
      setRefetch(false);
    }
  }, [refetch]);

  return (
    <div>
      Dashboard
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>In Custody</Tab>
          <Tab>Lent Out</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {library && (
              <Library
                library={library}
                userId={user_id}
                setRefetch={setRefetch}
              />
            )}
          </TabPanel>
          <TabPanel>
            <LentOut />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
