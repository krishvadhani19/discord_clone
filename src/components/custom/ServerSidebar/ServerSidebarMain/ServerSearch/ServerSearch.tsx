import { memo, useCallback, useEffect, useState } from "react";
import "./ServerSearch.scss";
import Modal from "@/components/ui/Modal/Modal";
import { CommandIcon, SearchIcon } from "@/components/ui/Icons";
import InputField from "@/components/ui/Input/InputField";
import { useParams, useRouter } from "next/navigation";

type SearchServerPropsType = {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | undefined
      | {
          id: string;
          name: string;
          icon: JSX.Element;
        }[];
  }[];
};

const ServerSearch = ({ data }: SearchServerPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] =
    useState<SearchServerPropsType["data"]>(data);
  const router = useRouter();
  const { serverId } = useParams();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleModalVisibility = useCallback(
    () => setIsOpen((prev) => !prev),
    []
  );

  const handleSearchInputChange = useCallback(
    (val: string) => {
      setSearchInput(val);

      if (!val.length) {
        setFilteredData(data);
        return;
      }

      const dataFilteredWithSearch = data.filter((dataItem) => {
        return !!dataItem?.data?.filter((dataItemChild) => {
          return dataItemChild?.name.startsWith(val);
        }).length;
      });

      setFilteredData(dataFilteredWithSearch);
    },
    [data]
  );

  const handleChannelClick = useCallback(
    (id: string, type: "channel" | "member") => {
      handleModalVisibility();

      if (type === "member") {
        router.push(`/servers/${serverId}/conversations/${id}`);
      } else if (type === "channel") {
        router.push(`/servers/${serverId}/channels/${id}`);
      }
    },
    [handleModalVisibility, router, serverId]
  );

  return (
    <>
      <div className="server-search-container" onClick={handleModalVisibility}>
        <div className="server-search-title">
          <SearchIcon size={20} />
          Search
        </div>

        <div className="server-search-shortcut">
          <CommandIcon size={20} className="server-search-shortcut-item" />

          <span className="server-search-shortcut-item flex-center">K</span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleModalVisibility} closeIcon={false}>
        <div className="search-server-modal-container">
          <InputField
            inputValue={searchInput}
            placeholder="Search all channels and members"
            type="text"
            autoComplete="text"
            onChange={handleSearchInputChange}
          />

          <div className="search-server-modal-results">
            {!filteredData.length && (
              <div className="flex-center">No results found.</div>
            )}

            {filteredData.map((category, key) => {
              if (!category?.data?.length) {
                return null;
              }

              return (
                <div key={key} className="search-server-modal-results-category">
                  <div className="search-server-modal-results-category-title">
                    {category?.label}
                  </div>

                  <div className="search-server-modal-results-category-channels">
                    {category?.data?.map((dataItem, key) => (
                      <div
                        key={key}
                        className="search-server-modal-results-channel-item"
                        onClick={() =>
                          handleChannelClick(dataItem?.id, category.type)
                        }
                      >
                        {dataItem?.icon}

                        <span>{dataItem?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(ServerSearch);
